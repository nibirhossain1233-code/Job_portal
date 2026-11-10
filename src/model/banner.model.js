const mongoose = require('mongoose');

// 1. Define the User Schema
const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    image:{
        type: String,
        required: [true, 'Image is required'],
    }
  },
  {
    // 2. Options: Automatically creates 'createdAt' and 'updatedAt' timestamps
    timestamps: true,
    versionKey: false // Disables the "__v" version key
  }
);

// 3. Compile the Schema into a Model
const Banner = mongoose.model('Banner', bannerSchema);

// 4. Export the Banner Model
module.exports = Banner ;