const express = require("express");
const {userRegister} = require("../controllers/userRegister.controller")
const {userLogin} = require("../controllers/userLogin.controller");
const {userLogout} = require("../controllers/userLogout.controller")
const userRouter = express.Router();

userRouter.post("/register", userRegister)
userRouter.post("/login", userLogin)
userRouter.post("/logout", userLogout)

module.exports = {
    userRouter
}