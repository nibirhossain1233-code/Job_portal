const { asyncHandler } = require("../utils/asyncHandler");

exports.createSponsorController = asyncHandler(async (req, res) => {
res.send("Sponsor created successfully");
})