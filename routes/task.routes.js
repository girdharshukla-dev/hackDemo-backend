const express = require("express");
const taskRouter = express.Router();

const {authMiddleware} = require("../middleware/authMiddleware")
const {addTask , deleteTask , updateTask , getSuggestions} = require("../controllers/tasks.controller")

taskRouter.use(authMiddleware);

taskRouter.post("/add", addTask);
taskRouter.delete("/delete/:id", deleteTask);
taskRouter.patch("/update/:id", updateTask);
taskRouter.get("/suggestions", getSuggestions);


module.exports = {
    taskRouter
}