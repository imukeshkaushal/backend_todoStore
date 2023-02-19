
const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
const todoSchema = mongoose.Schema({
    title : {type : String, required : true},
    desc : {type : String, required : true},
    status : {type : Boolean, required : true},
    user : String
}, {
    versionKey : false
})

const TodoModel = mongoose.model("todo",todoSchema);

module.exports = {
    TodoModel
}