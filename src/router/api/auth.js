const express = require('express');
const { signupController, signinController } = require('../../controllers/auth.controller');
const { verifyOtpController } = require('../../controllers/verifyOtp.controller');
const router = express.Router();


router.post('/signup', signupController);
router.post('/verify/:id', verifyOtpController);
router.post('/signin', signinController);



module.exports = router;