const mysql = require("mysql2");

const pool = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "mysql",
    database : "testing"
}).promise();

module.exports = pool