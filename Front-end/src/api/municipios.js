import axios from 'axios';

const API_URL = 'http://192.168.1.35:3000/api'; 

export const obtenerMunicipios = async () => {
  try {
    const res = await axios.get(`${API_URL}/municipios`);
    return res.data;
  } catch (error) {
    console.error('Error al obtener municipios:', error);
    return [];
  }
};
