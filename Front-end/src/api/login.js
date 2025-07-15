import axios from 'axios';

const API_URL = 'http://192.168.1.35:3000/api'; 

export const loginUsuario = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password }, {
      withCredentials: true, // Para que el cookie con el JWT sea enviado
    });

    return { ok: true, data: res.data };
  } catch (error) {
    if (error.response) {
      return { ok: false, mensaje: error.response.data.message };
    } else {
      return { ok: false, mensaje: 'Error de red o servidor no disponible' };
    }
  }
};
