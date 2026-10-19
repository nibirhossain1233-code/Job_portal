const UserModel = require("../model/user.model");
const apiResponse = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.getdataController = asyncHandler(async (req, res) => {
  
 const users = await UserModel.find();

    apiResponse(res, 200, "Data fetched successfully", users);
});