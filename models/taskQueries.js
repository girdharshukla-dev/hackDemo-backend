const db = require("../dbConnection");

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;

(async () => {
  try {
    await db.query(createTableQuery);
    console.log("Tasks table created...");
  } catch (err) {
    console.error("Error creating tasks table:", err);
  }
})();

// Insert task
async function insertTaskForUser(userID, title) {
  const result = await db.query(
    "INSERT INTO tasks (user_id, title) VALUES ($1, $2) RETURNING *",
    [userID, title]
  );
  return result.rows[0];
}

// Get all tasks for a user
async function getAllTasksForUser(userID) {
  const result = await db.query(
    "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
    [userID]
  );
  return result.rows;
}

// Get task by ID
async function getTaskById(taskID) {
  const result = await db.query(
    "SELECT * FROM tasks WHERE id = $1",
    [taskID]
  );
  return result.rows[0];
}

// Update task status
async function updateTaskStatusById(taskID, isCompleted) {
  const result = await db.query(
    "UPDATE tasks SET is_completed = $1 WHERE id = $2",
    [isCompleted, taskID]
  );
  return result.rowCount;
}

// Delete task
async function deleteTaskById(taskID) {
  const result = await db.query(
    "DELETE FROM tasks WHERE id = $1",
    [taskID]
  );
  return result.rowCount;
}

// Get tasks by status
async function getTasksByStatus(userID, isCompleted) {
  const result = await db.query(
    "SELECT * FROM tasks WHERE user_id = $1 AND is_completed = $2 ORDER BY created_at DESC",
    [userID, isCompleted]
  );
  return result.rows;
}

module.exports = {
  insertTaskForUser,
  getAllTasksForUser,
  getTaskById,
  updateTaskStatusById,
  deleteTaskById,
  getTasksByStatus,
};
