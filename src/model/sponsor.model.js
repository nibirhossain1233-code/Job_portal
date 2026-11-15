const mongoose = require('mongoose');

// 1. Define the User Schema
const sponsorSchema = new mongoose.Schema(
  {
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
const Sponsor = mongoose.model('Sponsor', sponsorSchema);

// 4. Export the Banner Model
module.exports = Sponsor ;