const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  startingLocation: {
    type: String,
    enum: ['home', 'office'],
    required: true
  },
  destination: {
    type: String,
    enum: ['home', 'office'],
    required: true
  },
  departureDateTime: {
    type: Date,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 1
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model('Ride', rideSchema);