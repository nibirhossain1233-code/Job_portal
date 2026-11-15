const express = require("express");
const { createSponsorController, getSponsorsController, deleteSponsorController } = require("../../controllers/sponsor.controller");
const router = express.Router();

router.post("/create-sponsor", createSponsorController);
router.get("/sponsors", getSponsorsController);
router.delete("/delete-sponsor/:id", deleteSponsorController);

module.exports = router;
