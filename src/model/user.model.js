const mongoose = require('mongoose');

// 1. Define the User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
      minlength: [3, 'name must be at least 3 characters long']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true, // Automatically converts email to lowercase before saving
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long']
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    otp:{
      type: String,
    }
  },
  {
    // 2. Options: Automatically creates 'createdAt' and 'updatedAt' timestamps
    timestamps: true,
    versionKey: false // Disables the "__v" version key
  }
);

// 3. Compile the Schema into a Model
const User = mongoose.model('User', userSchema);

// 4. Export the User Model
module.exports = User;