import express from "express";
const router = express.Router();

import { userController } from "../controllers/userController.js";
import { middleware } from "../middleware/middleware.js";

import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router
  .get("/", middleware.isLoggedIn, (req, res) => {
    return res.sendFile(path.join(__dirname, "..", "views", "login.html"));
  })
  .post("/", async (req, res) => {
    const response = await userController.dsia(req, res);
    return res.json(response);
  });

export { router };
