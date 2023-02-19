const express = require("express");
const { TodoModel } = require("../models/Todos.model");
const todoRouter = express.Router();

todoRouter.get("/", async(req,res) => {
    try{
        const todos = await TodoModel.find();
        res.send(todos);
    }
    catch(err){
        res.send({"msg": "Not Getting Data", "error" : err.message});
    }
    
})

todoRouter.post("/create", async(req,res) => {
    const payload = req.body;
    try{
        const todo = new TodoModel(payload)
        await todo.save();
        res.send({"msg": "Todo is Successfully Created"})
    }catch(err){

    }
})

todoRouter.patch("/update/:id", async(req,res) => {
    const ID = req.params.id;
    const payload = req.body;
    const todo = await TodoModel.findOne({"_id" : ID})
    const userId_in_todo = todo.userID;
    const userID_making_req = req.body.userID 
    try{
        if(userID_making_req !== userId_in_todo){
            res.send({"msg": "You are not authorized to perform this operation"});
        }
        else{
            await TodoModel.findByIdAndUpdate({"_id" : ID}, payload);
            res.send({"msg" : "Todo Item is Updated Successfully"})
        }
        
    }
    catch(err){
        res.send({"msg": "Todo is Not Updated", "error" : err.message})
    }
})

todoRouter.delete("/delete/:id", async(req,res) => {
    const ID = req.params.id;
    const todo = await TodoModel.findOne({"_id" : ID})
    const userId_in_todo = todo.userID;
    const userID_making_req = req.body.userID 
    try{
        if(userID_making_req !== userId_in_todo){
            res.send({"msg": "You are not authorized to perform this operation"});
        }
        else{
            await TodoModel.findByIdAndDelete({"_id" : ID});
            res.send({"msg" : "Todo Item is Deleted Successfully"})
        }
        
    }
    catch(err){
        res.send({"msg": "Todo is Not Deleted", "error" : err.message})
    }
})



module.exports = {
    todoRouter
}