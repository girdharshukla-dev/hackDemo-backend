const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",          
  password: "pgsql", 
  database: "testing",       
  port: 5432,                
});

module.exports = pool;
