import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

app.use(express.json())

app.use(cors({origin :'*',}))
app.use(cookieParser())

const PORT = 3000
app.listen(PORT, ()=>
    {console.log(`Servidor corriendo amigo en ${PORT}`)})