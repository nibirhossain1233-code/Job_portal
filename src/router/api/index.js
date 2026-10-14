const express = require('express');
const router = express.Router();
const auth =  require('./auth');
const getdata =  require('./getdata');

router.use('/auth', auth);
router.use('/data', getdata);

module.exports = router;