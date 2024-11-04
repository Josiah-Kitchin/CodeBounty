import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import logRequests from './middlewares/logging.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const PORT = process.env.PORT;
/* ---- Middleware ---- */
app.use(express.json());
app.use(logRequests);
/* ---- Routes ---- */
app.use('/users/', userRoutes);
app.use('/profiles/', profileRoutes);
app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});
/* ---- Server ---- */
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
