const { sendEmail } = require("../helpers/sendEmail");
const UserModel = require("../model/user.model");
const apiResponse = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signupController = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  let existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    apiResponse(res, 409, "User already exists!");
  } else {
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        apiResponse(res, 500, err || "Error hashing password");
      } else {
        const otp = uuidv4().toString().substring(0, 6);

        let user = new UserModel({
          name,
          email,
          password: hash,
          otpExpire: Date.now() + 5 * 60 * 1000, // OTP expires in 5 minutes
          otp,
        });

        await user.save();
        sendEmail(email, otp, name);
        apiResponse(res, 201, "Signup successful", user);
      }
    });
  }
});

exports.signinController = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  let existingUser = await UserModel.findOne({ email }).select("+password");
  if (!existingUser) {
    return apiResponse(res, 404, "User not found");
  }
  bcrypt.compare(password, existingUser.password, function (err, result) {
    if (err) {
      return apiResponse(res, 500, err || "Error comparing passwords");
    }
    if (!result) {
      return apiResponse(res, 401, "Invalid password");
    }
    let user = {
      email: existingUser.email,
      name: existingUser.name,
      role: existingUser.role,
      isActive: existingUser.isActive,
      isVerified: existingUser.isVerified,
    };
    jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.privateKey,
      { expiresIn: "1h" },
      function (err, token) {
        apiResponse(res, 200, "Signin successful", { ...user, token });
      },
    );
  });
});

exports.otpVerifyController = asyncHandler(async (req, res) => {
  let { email, otp } = req.body;

  let user = await UserModel.findOne({ email });
  if (user.otp == otp) {
    if (user.otpExpire > new Date()) {
      user.otp = null;
      user.isVerified = true;

      await user.save();
      apiResponse(
        res,
        200,
        "OTP verify successful",
      )
    } else {
      apiResponse(
        res,
        400,
        "The verification code has expired. Please request a new one.",
      );
    }
  } else {
    apiResponse(res, 400, "Otp not matched");
  }
});
