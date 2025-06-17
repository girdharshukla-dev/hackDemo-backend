const db = require("../dbConnection");

const createTableQuery = "CREATE TABLE IF NOT EXISTS tasks (id INT AUTO_INCREMENT PRIMARY KEY,user_id INT NOT NULL,title VARCHAR(255) NOT NULL,is_completed BOOLEAN DEFAULT FALSE,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);";

db.query(createTableQuery)
    .then(()=>{
        console.log("Tasks table created ...");
    })
    .catch((err)=>{
        console.log("Error in creating tasks table ...." , err);
    });

async function insertTaskForUser(userID, title) {
  const [result] = await db.query(
    "INSERT INTO tasks (user_id, title) VALUES (?, ?)",
    [userID, title]
  );
  return result;
}

async function getAllTasksForUser(userID) {
  const [rows] = await db.query(
    "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
    [userID]
  );
  return rows;
}

async function getTaskById(taskID) {
  const [rows] = await db.query(
    "SELECT * FROM tasks WHERE id = ?",
    [taskID]
  );
  return rows[0];
}

async function updateTaskStatusById(taskID, isCompleted) {
  const [result] = await db.query(
    "UPDATE tasks SET is_completed = ? WHERE id = ?",
    [isCompleted, taskID]
  );
  return result.affectedRows;
}

async function deleteTaskById(taskID) {
  const [result] = await db.query(
    "DELETE FROM tasks WHERE id = ?",
    [taskID]
  );
  return result.affectedRows;
}

async function getTasksByStatus(userID, isCompleted) {
  const [rows] = await db.query(
    "SELECT * FROM tasks WHERE user_id = ? AND is_completed = ? ORDER BY created_at DESC",
    [userID, isCompleted]
  );
  return rows;
}


module.exports = {
  insertTaskForUser,
  getAllTasksForUser,
  getTaskById,
  updateTaskStatusById,
  deleteTaskById,
  getTasksByStatus
}