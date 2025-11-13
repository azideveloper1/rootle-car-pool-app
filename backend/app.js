const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); // Add this line

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const rideRoutes = require('./routes/rideRoutes');


const app = express();
app.use(express.json());
app.use(cors()); // Allow CORS

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/rides', rideRoutes);


app.listen(PORT, HOST, () => console.log(`Server running on http://${HOST}:${PORT}`));