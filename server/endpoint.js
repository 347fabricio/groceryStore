import express from "express";
const app = express();
import { pool } from "./db.js";
const port = 5000;

app.listen(port, () => console.log("Listening..."));
app.use(express.json());
app.use(express.static("../client/public"));
app.use(express.static("../client/src"));

// ---------- START ----------

app.get("/product", async (req, res) => {
  try {
    const response = await pool.query(`SELECT * FROM products`);
    res.json(response.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params; // ID
    const response = await pool.query(`SELECT * FROM products WHERE id = $1`, [id]);
    res.json(response.rows);
    console.log(`Searching for id=${id}`);
  } catch (err) {
    console.error(err.message);
  }
});

// =======================
class Values {
  constructor(body) {
    this.name = body.name;
    this.price = body.price;
    this.unit = body.unit;
    this.quantity = body.quantity;
    this.purchasedate = body.purchasedate;
    this.madeby = body.madeby;
    this.madeon = body.madeon;
    this.expireson = body.expireson;
    this.description = body.description;
  }
}

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

app.post("/product/add", async (req, res) => {
  try {
    const body = new Values(req.body);
    const response = await pool.query(
      `INSERT INTO products (name, price, unit, quantity, purchaseDate, madeBy, madeOn, expiresOn, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      Object.values(body)
    );
    console.log(response);

    res.send(body);
    console.log(body);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/product/update/:id", async (req, res) => {
  try {
    const body = new Values(req.body);
    const { id } = req.params;
    console.log(id);
    const updateResponse = await pool.query(
      `UPDATE products SET (name, price, unit, quantity, purchaseDate, madeBy, madeOn, expiresOn, description) = ($1, $2, $3, $4, $5, $6, $7, $8, $9) WHERE id = $10`,
      [...Object.values(body), id]
    );

    res.json(updateResponse.rows);
    console.log(body);
  } catch (err) {
    console.error(err.message);
  }
});
