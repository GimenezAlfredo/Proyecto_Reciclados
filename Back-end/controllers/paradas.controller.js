import { connection } from '../db.js'

export const getParadas = async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT idusuario, nombre, latitud, longitud FROM usuario')
    res.json(rows)
  } catch (err) {
    console.error('Error al hacer query:', err.message)
    res.status(500).json({ message: 'Error al obtener las coordenadas' })
  }
}
