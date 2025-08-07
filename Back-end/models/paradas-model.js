import { connection } from '../db.js'

export const obtenerParadasDB = async (idRecolector) => {
  const [rows] = await connection.query(`
    SELECT 
      p.idpedidos,
      p.usuario_idusuario,
      d.calle,
      d.numero,
      d.barrio,
      d.referencias,
      d.latitud,
      d.longitud
    FROM pedidos p
    INNER JOIN direcciones d ON p.id_direccion = d.iddirecciones
    INNER JOIN detalle_pedido dp ON dp.pedidos_idpedidos = p.idpedidos
    WHERE p.estado = 0
      AND dp.id_recolector = ?
    GROUP BY p.idpedidos
  `, [idRecolector])

  return rows
}

//hacer otra consulta que retorne pedidos disponibles a elegir