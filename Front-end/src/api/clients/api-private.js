import axios from 'axios';
import Constants from 'expo-constants';
import { LimpiarSesion } from '../../utils/expired-util.js';
import { getToken } from '../../auth/auth.js'


const { apiUrl } = Constants.expoConfig.extra;

const apiPrivate = axios.create({
  baseURL: apiUrl,
});

// agregar token para envio
apiPrivate.interceptors.request.use(async (config) => {
    const token = await getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// manejar error de expiración
apiPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      console.warn('Token expirado o inválido');
      await LimpiarSesion(); 
    }
    return Promise.reject(error);
  }
);

export default apiPrivate;

//agregar mas controles de distintos erroes que devuelva el back