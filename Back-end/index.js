import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'


const app = express()

app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

app.use(express.json())

app.use(cors({
    origin: '*', // Permitir cualquier origen. Cambiar según sea necesario.
}));

app.use(cookieParser())

app.use('/api/user', userRoutes)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo amigo en http://localhost:${PORT}`)
})