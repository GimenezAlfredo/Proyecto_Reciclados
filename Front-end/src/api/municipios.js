import axios from 'axios';
import { API_URL } from '../../ip-config.js'; 

export const obtenerMunicipios = async () => {
  try {
    const res = await axios.get(`${API_URL}/municipios`);
    return res.data;
  } catch (error) {
    console.error('Error al obtener municipios:', error);
    return [];
  }
};
