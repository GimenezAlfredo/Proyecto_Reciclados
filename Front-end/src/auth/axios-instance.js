import axios from 'axios';
import { API_URL } from '../../ip-config.js';
import { LimpiarSesion } from '../utils/expired-util.js';
import { getToken } from './auth.js'


const api = axios.create({
  baseURL: API_URL,
});

// Interceptor de request para agregar token automáticamente
api.interceptors.request.use(async (config) => {
    const token = await getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de respuesta para manejar expiración
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      console.warn('Token expirado o inválido');
      await LimpiarSesion(); 
    }
    return Promise.reject(error);
  }
);

export default api;
