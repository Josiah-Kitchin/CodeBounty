import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import express from 'express';
dotenv.config();
const app = express();
const PORT = process.env.PORT;
/* ---- Middleware ---- */
app.use(express.json());
/* ---- Routes ---- */
app.use('/api/', userRoutes);
/* ---- Server ---- */
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
