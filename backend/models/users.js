const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
   
  },
  password: {
    type: String,
   
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  dp:{
    type : String
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
});  

userSchema.plugin(plm);

const User = mongoose.model('User', userSchema);

module.exports = User;

