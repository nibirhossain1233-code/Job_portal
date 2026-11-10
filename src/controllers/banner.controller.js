const Banner = require("../model/banner.model");
const apiResponse = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.createBannerController = asyncHandler(async (req, res) => {
  const { title, image } = req.body;

  if (!title || !image) {
    return apiResponse(res, 400, "Title and image are required");
  }

  const existingBanner = await Banner.findOne();

  if (existingBanner) {
    return apiResponse(
      res,
      409,
      "Banner already exists. You cannot create another banner.",
    );
  }

  const banner = await Banner.create({
    title,
    image,
  });

  return apiResponse(res, 201, "Banner created successfully", banner);
});
