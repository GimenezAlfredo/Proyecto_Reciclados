import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import paradasRoutes from './routes/paradas.routes.js'
import municipiosRoutes from './routes/municipios.routes.js';

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/paradas', paradasRoutes)

app.use('/api', municipiosRoutes); 

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`)
})
