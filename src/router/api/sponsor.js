const express = require("express");
const { createSponsorController, getSponsorsController, deleteSponsorController, updateSponsorController } = require("../../controllers/sponsor.controller");
const router = express.Router();

router.post("/create-sponsor", createSponsorController);
router.get("/sponsors", getSponsorsController);
router.delete("/delete-sponsor/:id", deleteSponsorController);
router.put("/update-sponsor/:id", updateSponsorController);

module.exports = router;
