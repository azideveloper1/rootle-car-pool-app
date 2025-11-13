const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  department: String,
  homeLocation: String,
  verificationStatus: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,
});

module.exports = mongoose.model('User', userSchema);
