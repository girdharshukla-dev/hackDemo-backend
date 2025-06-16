const { insertTaskForUser } = require("../models/taskQueries");

async function addTask(req, resp) {
    try {
        const { id, email } = req.user;
        userID = id;
        if(!userID){
            return resp.status(401).json({message : "User not found"});
        }
        const { task } = req.body;
        if(!task){
            return resp.status(400).json({message : "Missing task title"});
        }
        const result = await insertTaskForUser(userID , task);
        if(typeof result !== "number"){
            return resp.status(400).json({message : "Error in inserting task"});
        }
        console.log("Task added " + task);
        return resp.status(200).json({message : "Task added"});
    }catch(err){
        console.log("Error in inserting task " + err.message);
        return resp.status(500).json({message : "Error in adding task"});
    }
}

module.exports = {
    addTask
}