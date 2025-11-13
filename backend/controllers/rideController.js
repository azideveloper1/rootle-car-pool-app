const Ride = require('../models/ride');

exports.createRide = async (req, res) => {
  try {
    const { startingLocation, destination, departureDateTime, availableSeats, notes } = req?.body;
    if (!startingLocation || !destination || !departureDateTime || !availableSeats) {
      return res.status(400).json({ error: 'One or more required fields are missing: startingLocation, destination, departureDateTime, availableSeats' });
    }
    const ride = new Ride({
      startingLocation,
      destination,
      departureDateTime,
      availableSeats,
      notes
    });
    await ride.save();
    res.status(201).json({ message: 'Ride created successfully', ride });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};