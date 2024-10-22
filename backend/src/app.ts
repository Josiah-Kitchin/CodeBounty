



import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'

dotenv.config();


const express = require('express');
const app = express();
const PORT = process.env.PORT;

/* ---- Middleware ---- */

app.use(express.json());

/* ---- Routes ---- */

app.use('/api/users', userRoutes);

/* ---- Server ---- */
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});










