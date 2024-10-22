import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import logRequests from './middlewares/logging.js';
import express from 'express';
dotenv.config();
const app = express();
const PORT = process.env.PORT;
/* ---- Middleware ---- */
app.use(express.json());
app.use(logRequests);
/* ---- Routes ---- */
app.use('/api/', userRoutes);
/* ---- Server ---- */
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
