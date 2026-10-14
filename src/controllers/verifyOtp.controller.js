const UserModel = require("../model/user.model");
const apiResponse = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.verifyOtpController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { otp } = req.body;

    const user = await UserModel.findById(id);

    if (!user) {
        return apiResponse(res, 404, "User not found");
    }

    if (user.otp !== otp) {
        return apiResponse(res, 400, "Invalid OTP");
    }

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    apiResponse(res, 200, "OTP verified successfully", user);
});