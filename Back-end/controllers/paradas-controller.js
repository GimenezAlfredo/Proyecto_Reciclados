import { obtenerParadasDB } from '../models/paradas-model.js'

export const getParadas = async (req, res) => {
  try {
    const idRecolector = req.user.id  
    const paradas = await obtenerParadasDB(idRecolector)
    res.json(paradas)
  } catch (error) {
    console.error('Error al obtener paradas:', error.message)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}
