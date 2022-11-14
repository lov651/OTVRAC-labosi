const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Serije",
  password: "halo34",
  port: 5433,
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
};
