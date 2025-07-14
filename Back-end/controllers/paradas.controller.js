import { obtenerParadasDB } from '../models/paradas.model.js'

export const getParadas = async (req, res) => {
  try {
    const paradas = await obtenerParadasDB()
    res.json(paradas)
  } catch (err) {
    console.error('Error al obtener paradas:', err.message)
    res.status(500).json({ message: 'Error al obtener las coordenadas' })
  }
}
