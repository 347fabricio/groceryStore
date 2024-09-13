import jwt from "jsonwebtoken";
import "dotenv/config";

import { setAccessToken, clearAccessToken, clearRefreshToken } from "../controllers/handlers/cookieHandler.js";
import { View } from "../views/view.js";

class Middleware {
  constructor(view) {
    this.view = view;
  }

  signJWT(payload, signature, expires) {
    signature = signature == "access" ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
    return jwt.sign(payload, signature, { expiresIn: expires });
  }

  verifyJWT(token, signature) {
    signature = signature == "access" ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
    try {
      const decoded = jwt.verify(token, signature);
      return { payload: decoded, expired: false };
    } catch (error) {
      return { payload: null, expired: error.message };
    }
  }

  isLoggedIn(req, res, next) {
    const { refreshToken } = req.cookies;
    const { payload: refresh } = middleware.verifyJWT(refreshToken, "refresh");
    if (refresh) {
      console.log("You've already logged in.");
      return res.redirect("/");
    }
    return next();
  }

  deserializeUser(req, res, next) {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken && !refreshToken) return res.redirect("/login");

    const { payload: username, expired } = middleware.verifyJWT(accessToken, "access");

    if (username) {
      req.username = username.username;
      // console.log("accessToken was used.");
    } else if (expired && refreshToken) {
      const { payload: refresh } = middleware.verifyJWT(refreshToken, "refresh");
      if (refresh) {
        // console.log("refreshToken was used.");
        const newAcessToken = middleware.signJWT({ username: refresh.username }, "access", "10s");
        setAccessToken(res, newAcessToken);
        req.username = refresh.username;
      } else {
        // console.log("refreshToken is invalid or expired.");
        return res.redirect("/login");
      }
    }

    next();
  }

  requireUser(req, res, next) {
    if (req.username) {
      console.log(`Welcome, ${req.username}`);
      return next();
    } else {
      clearAccessToken(res);
      clearRefreshToken(res);
      console.log(`You can't use API, your session has expired.`);
      return res.redirect("/login");
    }
  }
}

export const middleware = new Middleware(new View());
