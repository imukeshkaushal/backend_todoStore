const express = require("express");
const { UserModel } = require("../models/User.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const userRouter = express.Router();

// Register a User & Verify Email Registered or Not

userRouter.post("/register", async(req,res) => {
    const {name,email,password} = req.body;
    try{
        bcrypt.hash(password, 5, async function(err, hash) {
            if(err) res.send({"msg": "There might be some error", "erors": err.message});
            else{
                const user = await UserModel.find({email : email});
                
                if(user.length>0){
                    res.send({"msg": "User Already Registered"});
                }
                else{
                    const user = new UserModel({name,email,password: hash});
                    await user.save();
                    res.send({"msg": "New User has been Registered Successfully"})
                }
                
            }
        });

    }catch(err){
        res.send({"msg": "There might be some error", "erors": err.message});
    }

})


// Login User and Verify the Password is Correct or Wrong.

userRouter.post("/login", async(req,res) => {
    const {email,password} = req.body;
    try{
        const user = await UserModel.find({email : email});
        if(user.length > 0){
            bcrypt.compare(password, user[0].password, function(err, result) {
               if(result){
                    let token = jwt.sign({userID : user[0]._id},"masai");
                    res.send({"msg": "Login Successfully", "token": token})
               }  
               else{
                    res.send({"msg": "Wrong Credentials"})
               }
            });
           
        }
        else{
            res.send({"msg": "Wrong Credentials"})
        }
    }catch(err){
        res.send({"msg": "There might be some error", "errors": err.message});

    } 

})


module.exports = {
    userRouter
}