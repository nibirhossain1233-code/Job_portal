const express = require("express");
const { createSponsorController } = require("../../controllers/sponsor.controller");
const router = express.Router();

router.post("/create-sponsor", createSponsorController);

module.exports = router;
