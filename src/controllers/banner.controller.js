const { asyncHandler } = require("../utils/asyncHandler");

exports.createBannerController = asyncHandler(async (req, res) => {
  const { title, image } = req.body;
  const banner = await Banner.create({ title, image });
  res.status(201).json({
    success: true,
    data: banner
  });
});