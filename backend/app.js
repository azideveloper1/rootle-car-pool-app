const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); // Add this line

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();
app.use(express.json());
app.use(cors()); // Allow CORS

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);

app.listen(PORT, HOST, () => console.log(`Server running on http://${HOST}:${PORT}`));