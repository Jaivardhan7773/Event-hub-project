import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import cookieParser from 'cookie-parser';


dotenv.config();
connectDB();

const app = express(); 
// hee hee hee
app.use(cookieParser());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Test route
app.get('/', (req, res) => {
    res.send('EventsHub API running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/events' , eventRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});