import dotenv from "dotenv"
dotenv.config()

import express from 'express';
import cors from 'cors';
import connectDb from './config/db.js';
import userRoutes from './Routes/userRoutes.js'
const app = express();
const port = process.env.PORT;

connectDb();

app.use(cors({
  origin : "http://localhost:5173",
  credentials : true
}))
app.use(express.json())
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})