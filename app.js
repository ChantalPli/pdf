import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import documentRoutes from './routes/DocumentRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use('/', documentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
