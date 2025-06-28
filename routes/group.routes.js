const express = require("express");

const groupRouter = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const { createUserGroup } = require("../controllers/createGroup.controller");
const { addGroupMember } = require("../controllers/addGroupMember.controller")

groupRouter.use(authMiddleware);

//this is used to make a group by the admin
groupRouter.post("/create", createUserGroup);

//pass the user to add as {userToAddId }
groupRouter.post("/:groupId/add-member", addGroupMember);

module.exports = {
    groupRouter
}