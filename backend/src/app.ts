



import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import logRequests from './middlewares/logging.js';
import authorizeToken from './middlewares/authorize.js'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* ---- Middleware ---- */

app.use(express.json());
app.use(logRequests);
app.use(cors()); //allow cross origin requests

/* ---- Routes ---- */

app.use('/users/', userRoutes);
app.use('/profiles/', profileRoutes)


app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

/* ---- Server ---- */
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});












