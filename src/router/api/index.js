const express = require('express');
const router = express.Router();
const auth =  require('./auth');
const getdata =  require('./getdata');
const banner =  require('./banner');
const sponsor =  require('./sponsor');

router.use('/auth', auth);
router.use('/data', getdata);
router.use('/banner', banner);
router.use('/sponsor', sponsor);

module.exports = router;