const db = require("../dbConnection");
const { createGroup } = require("../models/groupTable");
const { addUserToGroup } = require("../models/groupMember")

//expect name of the group 
async function createUserGroup(req, resp) {
    const { id: userId } = req.user;
    if (!userId) {
        return resp.status(404).json({ message: "User not loginned" });
    }
    console.log("Request Body ..... ", req.body);
    const { name } = req.body;
    if (!name || typeof name !== "string") {
        return resp.status(400).json({ message: "Invalid name group " });
    }
    const client = await db.connect();
    try {
        await client.query("BEGIN");

        const result = await client.query(
            `INSERT INTO groups (name, created_by) VALUES ($1, $2) RETURNING id`,
            [name, userId]
        );

        console.log("Insert result:", result);

        if (!result.rows || result.rows.length === 0) {
            throw new Error("Insert failed: No rows returned");
        }

        const groupId = result.rows[0].id;

        await client.query(`INSERT INTO group_members (group_id, user_id, role) VALUES ($1, $2, $3)`,
            [groupId, userId, "admin"]);

        await client.query("COMMIT");
        return resp.status(201).json({ message: "Created group succesfully " });
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Transaction to create group failed ..." + err.message);
        return resp.status(500).json({ message: "Error in group creation ..." });
    } finally {
        client.release();
    }
}

module.exports = {
    createUserGroup
}