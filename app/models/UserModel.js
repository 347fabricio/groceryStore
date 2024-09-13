import { pool } from "./database.js";
import bcrypt from "bcrypt";

export class Model {
  async getUser(username) {
    try {
      const { rows: user } = await pool.query(`SELECT username, password FROM users WHERE username = $1`, [username]);
      if (!user.length) throw new Error("Username or password is wrong.");
      return user[0];
    } catch (err) {
      return { Error: err.message };
    }
  }

  async validatePassword(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
}
