const { insertTaskForUser, deleteTaskById, updateTaskStatusById } = require("../models/taskQueries");

async function addTask(req, resp) {
    try {
        const { id, email } = req.user;
        let userID = id;
        if (!userID) {
            return resp.status(401).json({ message: "User not found" });
        }
        const { task } = req.body;
        if (!task) {
            return resp.status(400).json({ message: "Missing task title" });
        }
        const result = await insertTaskForUser(userID, task);
        // console.log(result);
        if (typeof result.insertId !== "number") {
            return resp.status(400).json({ message: "Error in inserting task" });
        }
        console.log("Task added : " + task + " with taskId " + result.insertId);
        return resp.status(200).json({ message: "Task added", taskId: result.insertId });
    } catch (err) {
        console.log("Error in inserting task " + err.message);
        return resp.status(500).json({ message: "Error in adding task" });
    }
}

//expecting the task id to be sent in the params
async function deleteTask(req, resp) {
    try {
        const { id, email } = req.user;
        const userId = id;
        const taskId = req.params.id;
        if (!taskId) {
            return resp.status(400).json({ message: "Missing params " });
        }
        const affectedRows = await deleteTaskById(taskId);
        if (affectedRows === 0) {
            return resp.status(200).json({ message: "No rows affected" });
        }
        return resp.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        console.log("Some error in deleting task " + err.message);
        return resp.status(500).json({ message: "error in deleting " });
    }
}

//this is to update whether the task is completed or not , it expects taskId in the params
async function updateTask(req, resp) {
    try {
        const taskId = req.params.id;
        const { isCompleted } = req.body;
        console.log("isCompleted is " + isCompleted);
        if(typeof isCompleted !== "boolean"){
            return resp.status(400).json({message : "isCompleted not boolean"});
        }
        const affectedRows = await updateTaskStatusById(taskId, isCompleted);
        if (affectedRows === 0) {
            return resp.status(200).json({ message: "No rows affected" });
        }
        return resp.status(200).json({ message: "Task updated" });
    }catch(err){
        console.log("Error in updating "+ err.message);
        return resp.status(500).json({message : "Error in updating"});
    }
}

module.exports = {
    addTask,
    deleteTask,
    updateTask
}