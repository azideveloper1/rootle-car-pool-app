const User = require('../models/user');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Helper: send OTP email
async function sendOTP(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourcompanyemail@gmail.com',
      pass: 'yourpassword',
    },
  });
  await transporter.sendMail({
    from: 'Carpool App <yourcompanyemail@gmail.com>',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`,
  });
}

exports.register = async (req, res) => {
  const { name, email, phone, department, homeLocation } = req.body;
  if (!email.endsWith('@yourcompany.com')) {
    return res.status(400).json({ error: 'Email must be a company email.' });
  }
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  try {
    let user = await User.findOne({ email });
    if (user) {
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    } else {
      user = await User.create({ name, email, phone, department, homeLocation, otp, otpExpires });
    }
    await sendOTP(email, otp);
    res.json({ message: 'OTP sent to email.' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed.' });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || user.otpExpires < new Date()) {
    return res.status(400).json({ error: 'Invalid or expired OTP.' });
  }
  user.verificationStatus = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();
  res.json({ message: 'Email verified. Registration complete.' });
};
