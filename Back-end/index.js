import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import loginRoutes from './routes/login-routes.js';
import paradasRoutes from './routes/paradas-routes.js'
import municipiosRoutes from './routes/municipios-routes.js';

dotenv.config()

const app = express()

//cors bien configurado
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use('/api/user', loginRoutes)
app.use('/api/paradas', paradasRoutes)
app.use('/api', municipiosRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`)
})
