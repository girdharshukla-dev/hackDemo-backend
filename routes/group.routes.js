const express = require("express");

const groupRouter = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const { createUserGroup } = require("../controllers/createGroup.controller");

groupRouter.use(authMiddleware);

groupRouter.post("/create" , createUserGroup);


module.exports = {
    groupRouter
}