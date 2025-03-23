import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUrl = process.env.MONGO_URL;
    if(!mongoUrl)
        throw new Error("Failed to get mongoUrl! ");
    try {
        await mongoose.connect(mongoUrl);
        console.log("Database connected!");
    } catch (error) {
        console.error("Failed to connect database! ", error);
    }
}

export default connectDB;