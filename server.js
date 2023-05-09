const express = require('express')
const app = express()
const port = 3000
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://heamnath:oEVo2eSZzxThERPJ@cluster0.vuifujj.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});
const TestModel = require("./models/testmodel")
const User = require('./models/userModels')
const bcrypt = require('bcrypt');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

app.get('/',(req,res)=>{
    res.send('hello world')

})

app.post('/login', async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
  
    try {
      // find the user with the specified email in the 'users' collection
      const user = await User.findOne({email:email });
      console.log(user)
      // if user is not found, send an error response
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      // compare the provided password with the stored hashed password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      // if the password is not valid, send an error response
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      // send a success response
      res.status(200).json({ user_id: user.id });
    } catch (error) {
      console.error(error);
  
      // send an error response
      res.status(500).json({ message: 'An error occurred while logging in.' });
    }
  });
  


app.post('/signin', async (req, res) => {
    const { email, password, name, username, age, sex } = req.body;
    console.log(req.body)
  
    try {
      // hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // create a new user instance using the User model with the hashed password
      const newUser = new User({ email, password: hashedPassword, name, username, age, sex });
  
      // save the new user instance to the 'users' collection in MongoDB
      await newUser.save();
  
      // send a success response
      res.status(200).json({ message: 'Sign in successful!' });
    } catch (error) {
      console.error(error);
  
      // send an error response
      res.status(500).json({ message: 'An error occurred while signing in.' });
    }
  });
  

