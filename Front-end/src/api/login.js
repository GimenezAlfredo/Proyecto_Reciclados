import axios from 'axios';

const API_URL = 'http://192.168.1.35:3000/api';

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
