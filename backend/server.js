import express from 'express'
import authRouter from './routes/authRoutes.js';
import dotenv from 'dotenv';
import { connectMongoDB } from './db/connectMongoDB.js';
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Server is ready")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})