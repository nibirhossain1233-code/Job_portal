const Sponsor = require("../model/sponsor.model");
const { asyncHandler } = require("../utils/asyncHandler");

exports.createSponsorController = asyncHandler(async (req, res) => {
let {image} = req.body;

if (!image) {
    return res.status(400).json({ message: "Image is required" });
}

let sponsor = new Sponsor({ image });
await sponsor.save();

return res.status(201).json({ message: "Sponsor created successfully", sponsor });
});

exports.getSponsorsController = asyncHandler(async (req, res) => {
    let sponsors = await Sponsor.find();
    return res.status(200).json({ message: "Sponsors retrieved successfully", sponsors });
});

exports.deleteSponsorController = asyncHandler(async (req, res) => {
    let { id } = req.params;
    let sponsor = await Sponsor.findByIdAndDelete({ _id: id });
    if (!sponsor) {
        return res.status(404).json({ message: "Sponsor not found" });
    }
    return res.status(200).json({ message: "Sponsor deleted successfully", sponsor });
});