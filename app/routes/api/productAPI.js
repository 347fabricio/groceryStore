import express from "express";
const router = express.Router();

import { middleware } from "../../middleware/middleware.js";
import { Values } from "../../../src/libs/classes/ProductConstructor.js";
import { productController } from "../../controllers/productController.js";

router.use(middleware.requireUser);
router
  .get("/product", async (req, res) => {
    const response = await productController.getProducts();
    res.json(response);
  })
  .get("/product/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const response = await productController.getSpecificProducts(id);
      res.status(200).json(response);
    } catch (err) {
      console.error(err.message);
    }
  })
  .post("/product", async (req, res) => {
    try {
      const response = await productController.newProduct(new Values(req.body), req.username);
      if (response.Error) throw new Error(response.Error);
      res.status(201).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err.message });
    }
  })
  .put("/product/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const response = await productController.updtProduct(new Values(req.body), id, req.username);
      res.status(200).json(response);
    } catch (err) {
      console.error(err.message);
    }
  })
  .delete("/product", async (req, res) => {
    try {
      const response = await productController.delProduct(req.body, req.username);
      if (response.Error) throw new Error(response.Error);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  });

export { router };
