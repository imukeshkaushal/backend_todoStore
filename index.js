const express = require("express");
const app = express();
const connection = require("./config/db");
require('dotenv').config()

const { userRouter } = require("./router/User.route");
const {todoRouter} = require("./router/Todo.route");
const { authenticate } = require("./middleware/authenticate.middleware");
const cors = require("cors");

app.use(cors({
    origin : "*"
}))

app.use(express.json());




app.get("/", (req,res) => {
    res.send("Home Page");
})

app.use("/users",userRouter);
app.use(authenticate);
app.use("/todos",todoRouter);




app.listen(process.env.port, async () => {
    try{
        await connection
        console.log("Connected to DB");
    }
    catch(err){
        console.log("Not Connected to DB", err.message);
    }
    console.log("Server is Running");
})