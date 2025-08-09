import apiPublic from '../clients/api-public';

export const obtenerMunicipios = async () => {
  try {
    const res = await apiPublic.get('/municipios');
    return res.data;
  } catch (error) {
    console.error('Error al obtener municipios:', error);
    return [];
  }
};
