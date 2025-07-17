import { obtenerMunicipiosDB } from '../models/municipios-model.js';

export const getMunicipios = async (req, res) => {
  try {
    const municipios = await obtenerMunicipiosDB();
    res.json(municipios);
  } catch (error) {
    console.error('Error al obtener municipios:', error);
    res.status(500).json({ error: 'Error al obtener municipios' });
  }
};
