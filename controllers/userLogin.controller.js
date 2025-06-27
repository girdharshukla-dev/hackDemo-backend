const { setUserToken } = require("../auth/jwt.service")
const bcrypt = require("bcryptjs");
const { getUserFromDbByEmail } = require("../models/userQueries")

async function userLogin(req, resp) {
    try {
        const { email, password } = req.body;
        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password.trim()
        ) {
            return resp.status(400).json({ message: "Invalid input format" });
        }

        const user = await getUserFromDbByEmail(email);
        if (!user) {
            return resp.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return resp.status(401).json({ message: "Invalid credentials" })
        }

        const jwtToken = setUserToken({id: user.id , email: user.email});
        resp.cookie("jwtToken", jwtToken, {
            httpOnly: true,
            sameSite: "Strict",
            secure: process.env.NODE_ENV==="production"
        });
        return resp.status(200).json({ message: "Login success" , user : {id:user.id , email: user.email}, token:jwtToken });
    } catch (err) {
        console.log("Error in login : " + err.message);
        return resp.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    userLogin
}