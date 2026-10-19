const { sendEmail } = require("../helpers/sendEmail");
const UserModel = require("../model/user.model");
const apiResponse = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

exports.signupController = asyncHandler(async (req, res) => {
  
  let { name, email, password } = req.body;
  
  bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      apiResponse(res, 500, err || "Error hashing password");
    } else {
      
      const otp = uuidv4().toString().substring(0, 6);

      let user = new UserModel({
        name,
        email,
        password: hash,
        otp: otp,
        otpExpire: Date.now() + 5 * 60 * 1000, // OTP expires in 5 minutes
      });

      await user.save();
      // sendEmail(email, otp, name);
      apiResponse(res, 201, "Signup successful", user);
    }
  });
});

exports.signinController = asyncHandler(async (req, res) => {
  res.send("Signin successful");
});