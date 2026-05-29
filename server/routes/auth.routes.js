const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate.middleware');
const {
  register,
  login,
  refresh,
  logout,
  sendOtp,
  verifyOtp
} = require('../controllers/auth.controller');

const router = express.Router();

router.post(
  '/register',
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  validate,
  register
);

router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  validate,
  login
);

router.post('/refresh', refresh);
router.post('/logout', logout);

router.post(
  '/send-otp',
  [body('email', 'Please include a valid email').isEmail()],
  validate,
  sendOtp
);

router.post(
  '/verify-otp',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('otp', 'OTP is required').exists(),
  ],
  validate,
  verifyOtp
);

module.exports = router;
