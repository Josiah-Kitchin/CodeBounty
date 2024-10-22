import dotenv from 'dotenv';
dotenv.config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
// Middleware to parse JSON bodies
app.use(express.json());
// Import your routes
const userRoutes = require('./routes/userRoutes'); // Adjust the path as necessary
// Use your routes
app.use('/api/users', userRoutes);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
