const db = require("../dbConnection");

const createTableQuery = "CREATE TABLE IF NOT EXISTS users( id INTEGER AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100), email VARCHAR(100) UNIQUE, password VARCHAR(200));";

db.query(createTableQuery)
  .then(()=>{
    console.log("Users Table created....");
  })
  .catch(err=>{
    console.log("Error in users creating table .." + err);
  });

async function insertUserIntoDb(user){
    const [result] = await db.query("INSERT INTO users(username,email,password) VALUES (?,?,?)",[user.username,user.email,user.password]);
    console.log("Insert result : ",result);
    return result.insertId;
}

async function getUserFromDbByEmail(email){
    const [result] = await db.query("SELECT * FROM users WHERE email=?",[email]);
    return result[0];
}

async function getUserFromDbByUserID(userID){
  const [result] = await db.query("SELECT * FROM users WHERE id=?",[userID]);
  return result[0];
} 

module.exports = {
  insertUserIntoDb,
  getUserFromDbByEmail,
  getUserFromDbByUserID
}