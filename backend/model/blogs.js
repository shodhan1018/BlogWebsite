const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    
  },
  image:{
    type:String,
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
});

// Define the Blog schema
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Create the User and Blog models
const User = mongoose.model('User', UserSchema);
const Blog = mongoose.model('Blog', BlogSchema);

// Export the models
module.exports = { User, Blog };
