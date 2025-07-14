import { connection } from '../db.js'

export const obtenerParadasDB = async () => {
  const [rows] = await connection.query(`
    SELECT 
      p.idpedidos,
      p.usuario_idusuario,
      d.calle,
      d.numero,
      d.latitud,
      d.longitud
    FROM pedidos p
    INNER JOIN direcciones d ON p.id_direccion = d.iddirecciones
    WHERE p.estado = 0
  `)
  return rows
}
