import axios from 'axios';
import { API_URL } from '../../ip-config.js'; // ruta relativa según tu estructura

export const loginUsuario = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, { email, password }, {
      withCredentials: true
    });

    return {
      ok: true,
      mensaje: response.data.message,
      token: response.data.token
    };
  } catch (error) {
    console.error('❌ Error en loginUsuario:', error);
    return {
      ok: false,
      mensaje: error.response?.data?.message || 'Error desconocido'
    };
  }
};
