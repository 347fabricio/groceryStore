import { setAccessToken, setRefreshToken, clearAccessToken, clearRefreshToken } from "./handlers/cookieHandler.js";
import { middleware } from "../middleware/middleware.js";
import { Model } from "../models/UserModel.js";
import { View } from "../views/view.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async dsia(req, res) {
    try {
      const cookies = req.cookies;
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ Error: "Username and password are required." });
      }

      if (cookies) {
        clearAccessToken(res);
        clearRefreshToken(res);
      }

      const user = await this.model.getUser(username);
      if (user.Error) {
        // return user;
        console.log(user.Error);
        return res.status(401).json({ Error: user.Error });
      }

      const passwordMatch = await this.model.validatePassword(password, user.password);
      if (passwordMatch) {
        const accessToken = middleware.signJWT({ username: user.username }, "access", "10s");
        const refreshToken = middleware.signJWT({ username: user.username }, "refresh", "1d");
        setAccessToken(res, accessToken);
        setRefreshToken(res, refreshToken);
      } else {
        return { Error: "Username or password is wrong. " };
      }

      return this.view.productsPage(res);
    } catch (err) {
      console.log(err.message);
    }
  }
}

export const userController = new Controller(new Model(), new View());
