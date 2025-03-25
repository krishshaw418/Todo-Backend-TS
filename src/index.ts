import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './configuration/db';
connectDB();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';
const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use(`/api/auth`, authRoutes);
app.use(`/api/action`, todoRoutes);

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})