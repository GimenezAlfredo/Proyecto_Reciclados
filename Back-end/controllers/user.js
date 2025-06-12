import { connection } from "../db.js"
import util from 'util'
import bycrpt from 'bcrypt'
import { validateRegister } from "../middlewares/validateUser.js"

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

export const showUser = async (req, res) => {

    try {
        const queryListUsers =
    `SELECT 
        u.nombre,
        u.apellido,
        u.email,
        u.telefono,
        u.fecha_nacimiento,
        r.descripcion AS nombre_rol,
        m.descripcion AS nombre_municipio
    FROM usuario u
    JOIN rol r ON u.rol_idrol = r.idrol
    JOIN municipio m ON u.municipio_idmunicipio = m.idmunicipio;`

    const userList = await query(queryListUsers)

    res.status(200).json(userList)
    }

    catch (error) {
        res.status(500).json({message: error.message})
    }
}