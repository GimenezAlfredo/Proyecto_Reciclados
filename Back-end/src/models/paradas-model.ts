import { RowDataPacket } from "mysql2";
import { connection } from "../db.js";

// Definimos el tipo que representa un pedido pendiente
export interface PedidoPendiente extends RowDataPacket {
  idpedidos: number;
  id_direccion: number;
  estado: number;
  calle: string;
  numero: string;
  barrio: string;
  referencias: string;
  latitud: number;
  longitud: number;
}


export const obtenerParadasDB = async (): Promise<PedidoPendiente[]> => {
  const [rows] = await connection.query<PedidoPendiente[]>(`
    SELECT 
      p.idpedidos,
      p.id_direccion,
      p.estado,
      d.calle,
      d.numero,
      d.barrio,
      d.referencias,
      d.latitud,
      d.longitud
    FROM pedidos p
    INNER JOIN direcciones d ON p.id_direccion = d.iddirecciones
    WHERE p.estado = 0
    GROUP BY p.idpedidos
  `);

  return rows;
};



//hacer otra consulta donde guardes las paradas en la tabla rutas


//otra consulta donde traigas esas rutas guardadas para tener el seguimiento