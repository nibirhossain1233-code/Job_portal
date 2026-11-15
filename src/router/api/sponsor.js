const express = require("express");
const { createSponsorController, getSponsorsController } = require("../../controllers/sponsor.controller");
const router = express.Router();

router.post("/create-sponsor", createSponsorController);
router.get("/sponsors", getSponsorsController);

module.exports = router;
