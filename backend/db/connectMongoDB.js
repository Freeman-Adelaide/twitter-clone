import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("DB connected"))
    } catch (error) {
        console.error(`Error connection to mongoDB: ${error.message}`);
    }
}
