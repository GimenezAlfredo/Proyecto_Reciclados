import apiPublic from '../clients/api-public';

export const loginUsuario = async (email, password) => {
  try {
    const response = await apiPublic.post('/user/login', { email, password }, {
      withCredentials: true
    });

    return {
      ok: true,
      mensaje: response.data.message,
      token: response.data.token,
      user : response.data.user
    };
  } catch (error) {
    console.error('❌ Error en loginUsuario:', error);
    return {
      ok: false,
      mensaje: error.response?.data?.message || 'Error desconocido'
    };
  }
};
