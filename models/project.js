// model files are singular form 
// this file represemt a project in my database

const mongoose = require("mongoose");

const schemaObj = {
    name : {
        type : String,
        required : true,
    },
    dueDate : {
        type : Date,
    },
    course : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        default : "TO DO"
    }
    
}

let mongooseSchema = new mongoose.Schema(schemaObj)

module.exports = mongoose.model("Project", mongooseSchema);