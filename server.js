import express from "express";
import cookieParser from "cookie-parser";
const app = express();
const port = 5000;

import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "src")));
app.use(express.static(path.join(__dirname, "src", "public")));
app.use(express.static(path.join(__dirname, "src", "libs")));

import { router as loginRoute } from "./app/routes/login.js";
import { router as indexRoute } from "./app/routes/indexRoute.js";
import { router as productAPI } from "./app/routes/api/productAPI.js";

// ---------- START ----------
app.use("/login", loginRoute);
app.use("/", indexRoute);
app.use("/api/", productAPI);

app.listen(port, () => console.log("\n"));
