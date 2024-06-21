import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import documentRoutes from './routes/documentRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use('/', documentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
