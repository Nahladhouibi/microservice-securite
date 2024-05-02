const pool = require("pool");
const dbConfig = require("./db.config.js");

var connection = pool.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;