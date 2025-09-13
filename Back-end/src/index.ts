import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import loginRoutes from './routes/login-routes.js';
import paradasRoutes from './routes/paradas-routes.js';

dotenv.config()

const app = express()

//cors bien configurado
// app.use(cors({
//   origin: 'http://localhost:5173', //luego cambiar a HTTPS y el nombre del domisnio 'https://midominio.com',
//   credentials: true
// }));

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/user', loginRoutes)
app.use('/api/paradas', paradasRoutes)

// 🔹 Railway usa su propio PORT
const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`)
})

// const PORT = Number(process.env.PORT) || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor backend corriendo en el puerto ${PORT}`)
// })
