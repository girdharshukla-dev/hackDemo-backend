const db = require("../dbConnection");

const createGroupsTableQuery = `
  CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
  );
`;

async function createGroupsTable() {
  try {
    await db.query(createGroupsTableQuery);
    console.log("Groups table created...");
  } catch (err) {
    console.error("Error creating groups table:", err);
  }
}

async function createGroup(name, createdBy) {
  const result = await db.query(
    `INSERT INTO groups (name, created_by) VALUES ($1, $2) RETURNING id`,
    [name, createdBy]
  );
  return result.rows[0].id;
}

module.exports = {
  createGroupsTable,
  createGroup,
};
