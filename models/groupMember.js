const db = require("../dbConnection");

const createGroupMembersTableQuery = `
  CREATE TABLE IF NOT EXISTS group_members (
    id SERIAL PRIMARY KEY,
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    role VARCHAR(20) DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (group_id, user_id)
  );
`;

async function createGroupMembersTable() {
  try {
    await db.query(createGroupMembersTableQuery);
    console.log("Group members table created...");
  } catch (err) {
    console.error("Error creating group_members table:", err);
  }
}

async function addUserToGroup(groupId, userId, role = "member") {
  await db.query(
    `INSERT INTO group_members (group_id, user_id, role) VALUES ($1, $2, $3)`,
    [groupId, userId, role]
  );
}

module.exports = {
  createGroupMembersTable,
  addUserToGroup
};