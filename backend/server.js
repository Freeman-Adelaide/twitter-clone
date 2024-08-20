import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';

import { connectMongoDB } from './db/connectMongoDB.js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json()) // to parse req.body
app.use(cors())
app.use(express.urlencoded({ extended: true })); //to parse form data
app.use(cookieParser());

//api endpoints
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter)

app.get("/", (req, res) => {
    res.send("Server is ready")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})