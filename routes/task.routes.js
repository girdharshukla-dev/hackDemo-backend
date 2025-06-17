const express = require("express");
const taskRouter = express.Router();

const {authMiddleware} = require("../middleware/authMiddleware")
const {addTask , deleteTask , updateTask} = require("../controllers/tasks.controller")

taskRouter.use(authMiddleware);

taskRouter.post("/add", addTask);
taskRouter.delete("/delete/:id", deleteTask);
taskRouter.patch("/update/:id", updateTask);


module.exports = {
    taskRouter
}