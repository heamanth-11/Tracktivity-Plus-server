
const mongoose = require('mongoose');

// define a user schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  username: String,
  age: Number,
  sex: String
});

// create a mongoose model for the user schema
const User =  new mongoose.model('User', userSchema);

module.exports = User;