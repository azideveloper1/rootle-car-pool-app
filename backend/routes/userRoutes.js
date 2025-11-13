const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/verify-otp', userController.verifyOtp);

module.exports = router;
