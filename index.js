require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const { userRouter } = require("./routes/user.routes");
const { authMiddleware } = require("./middleware/authMiddleware");
const { taskRouter } = require("./routes/task.routes");

app.get("/health",(req,resp)=>{
    console.log("Req received ",req);
    return resp.json({message : "health-check"});
})

app.use("/api/user",userRouter);
app.use("/api/task",taskRouter);

//this api is for testing for the authMiddleware
app.get("/test",authMiddleware,(req,resp)=>{
    console.log("Middle ware worked ...." + req.user.id + "  " + req.user.email);
    console.log(req.user);
    return resp.status(200).json({message : "Hello" , email: req.user.email});
})


app.listen(PORT, ()=>{
    console.log(">Server started at port " + PORT);
})