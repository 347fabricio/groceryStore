const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "lunga347",
  database: "grocery_store",
  host: "localhost",
  port: 5432,
  encoding: "utf8",
});

module.exports = pool;
