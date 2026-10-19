const express = require('express');
const { getdataController } = require('../../controllers/getdata.controller');
const router = express.Router();


router.get('/', getdataController);



module.exports = router;