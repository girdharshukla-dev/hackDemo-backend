const express = require("express");
const taskRouter = express.Router();

const {authMiddleware} = require("../middleware/authMiddleware")
const {addTask} = require("../controllers/tasks.controller")

taskRouter.use(authMiddleware);

taskRouter.post("/add", addTask);



module.exports = {
    taskRouter
}