import { pool } from "./database.js";

export class Model {
  async selectExpiresOnes() {
    const { rows: response } =
      await pool.query(`SELECT * FROM (SELECT id, expireson - CURRENT_DATE AS difference FROM products) WHERE difference < 31 ORDER BY difference DESC; 
`);
    let id = response.map((x) => x.id);
    let difference = response.map((x) => x.difference);
    return { id, difference };
  }

  async selectAllProducts() {
    const { rows: response } = await pool.query(`SELECT * FROM products`);
    return response;
  }

  async selectAProduct(id) {
    const { rows: response } = await pool.query(`SELECT * FROM products WHERE id = $1`, [id]);
    return response[0];
  }

  async insertProduct(product) {
    try {
      const { rowCount: response } = await pool.query(
        `INSERT INTO products (name, price, unit, quantity, purchaseDate, madeBy, madeOn, expiresOn, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        Object.values(product)
      );
      if (!response) throw new Error("Something wrong...");
      return response;
    } catch (err) {
      return { Error: err.message };
    }
  }

  async updateProduct(targetProduct, id) {
    try {
      const { rowCount: updated } = await pool.query(
        `UPDATE products SET (name, price, unit, quantity, purchaseDate, madeBy, madeOn, expiresOn, description) = ($1, $2, $3, $4, $5, $6, $7, $8, $9) WHERE id = $10`,
        [...Object.values(targetProduct), id]
      );
      if (!updated) throw new Error("Something wrong...");
      return updated;
    } catch (err) {
      return { Error: err.message };
    }
  }

  async deleteProduct(products) {
    try {
      for (let i = 0; i < products.length; i++) {
        const { rowCount: product } = await pool.query(`DELETE FROM products WHERE id = $1;`, [products[i]]); // rowCount like in insert to pass in the test
        if (!product) throw new Error("The product was not found.");
      }
      return true;
    } catch (err) {
      return { Error: err.message };
    }
  }
}
