import express from "express";
const app = express();
import { pool } from "./db.js";
const port = 5000;

app.listen(port, () => console.log("Listening..."));
app.use(express.json());
app.use(express.static("../client"));

// ---------- START ----------

app.get("/product", async (req, res) => {
  try {
    const response = await pool.query(`SELECT * FROM products`);
    res.json(response.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/product/add", async (req, res) => {
  try {
    const body = req.body;
    const response = await pool.query(
      `INSERT INTO products (name, price, unit, quantity, purchaseDate, madeBy, madeOn, expiresOn, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        body.name,
        body.price,
        body.unit,
        body.quantity,
        body.purchaseDate,
        body.madeBy,
        body.madeOn,
        body.expiresOn,
        body.description,
      ]
    );
    console.log(response);

    res.send(body);
    console.log(body);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/product/delete", async (req, res) => {
  try {
    const body = req.body;
    console.log(body.length);
    for (let i = 0; i < body.length; i++) {
      await pool.query(`DELETE FROM products WHERE id = $1;`, [body[i]]);
      console.log(`You've successfully deleted a product.`);
    }
    res.send(body);
  } catch (err) {
    console.error(err.message);
  }
});
