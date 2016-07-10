var mongoose = require('mongoose');

//user Schema
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  created_at: {type: Date, default: Date.now}
});

//posts Schema
var postSchema = new mongoose.Schema({
  text: String,
  created_by: String,
  created_at: {type: Date, default: Date.now}
});

//create a User model with schema of userSchema
mongoose.model('User', userSchema);
mongoose.model('Post', postSchema);
