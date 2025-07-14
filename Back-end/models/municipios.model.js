import { connection } from '../db.js';

export const obtenerMunicipiosDB = async () => {
  const [rows] = await connection.query(`
    SELECT 
      idmunicipio AS value, 
      descripcion AS label 
    FROM municipio
  `);
  return rows;
};
