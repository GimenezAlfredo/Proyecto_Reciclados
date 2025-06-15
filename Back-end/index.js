import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import loginRoutes from './routes/loginRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express()

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // front
  credentials: true // uso de cookies
}));

app.use(express.json())
app.use(cookieParser())

app.use('/api/user', loginRoutes);

const PORT = 3000
app.listen(PORT, ()=>
    {console.log(`Servidor corriendo amigo en ${PORT}`)})

