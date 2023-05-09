const mongoose = require("mongoose")

const TestSchema = mongoose.Schema({email:String,password:String});

const TestModel =  new mongoose.model("TestModel",TestSchema)

module.exports = TestModel;