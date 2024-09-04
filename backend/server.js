import path from "path";
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

import { connectMongoDB } from './db/connectMongoDB.js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

//middleware
app.use(express.json({limit: "5mb"})) // to parse req.body
//limit shouldn't be too high to prevent DOS attack 
app.use(cors())
app.use(express.urlencoded({ extended: true })); //to parse form data
app.use(cookieParser());

//api endpoints
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter)
app.use("/api/notifications", notificationRoutes)

app.get("/", (req, res) => {
    res.send("Server is ready")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})