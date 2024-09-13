import express from "express";
const router = express.Router();

import { middleware } from "../middleware/middleware.js";

import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.use(middleware.deserializeUser);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

export { router };
