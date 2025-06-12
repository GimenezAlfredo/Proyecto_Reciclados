import { connection } from "../db"
import util from 'util'
import bycrpt from 'bcryptjs'
import { validateRegister } from "../middlewares/validateUser"

const query = util.promisify(connection.query).bind(connection)

export const createUser = [validateRegister, async(req, res) =>{
    try {
        const queryMail = "SELECT email FROM usuario WHERE email = ?"
        const result = await query(queryMail, [req.body.email])

        if (result.length){
            return res.status(409).json("Usuario existente")
            
        }

        const salt = bycrpt.genSaltSync(10)

        const encryptPass = bycrpt.hashSync(req.body.password, salt)

        const userInputs = [req.body.nombre, req.body.apellido, req.body.email, encryptPass, req.body.telefono, req.body.fecha_nacimiento, 3, req.body.idmunicipio]

        const queryCreateUser = "INSERT INTO usuario (`nombre`, `apellido`, `email`, `password`, `telefono`, `fecha_nacimiento`, `rol_idrol`, `municipio_idmunicipio`) VALUES (?)"

       await query(queryCreateUser, [userInputs])

       res.status(200).json('Usuario creado con éxito.')
    } 

    catch (error) {
        res.status(500).json({message:error.message})
    }
}]