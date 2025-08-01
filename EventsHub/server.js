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


// console.log("api key is 🤣🔥🔥 " + process.env.CLOUDINARY_API_KEY);


const app = express(); 


app.use(cors({
    origin:process.env.CLIENT_URL, // Replace with your client URL
    credentials: true, 
}))

// hee hee hee
app.use(cookieParser());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Test route
app.get('/', (req, res) => {
    res.send('EventsHub API running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/events' , eventRoutes)


const PORT = process.env.PORT || 5000;
//  console.log(PORT)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});