// src/services/paradas-service.ts
import apiPrivate from "../clients/api-private"; // 👈 le sacamos el .js, TS resuelve solo
import { prepararGruposParaRutas, Punto } from "../../utils/agrupador-rutas"; // 👈 ahora viene tipado

/** ---- Tipos del backend ---- */
export interface PedidoPendiente {
  idpedidos: number;
  id_direccion: number;
  estado: number;
  calle: string;
  numero: string;
  barrio: string;
  referencias: string;
  /** El back a veces puede mandar string; lo normalizamos a number más abajo */
  latitud: number | string | null;
  longitud: number | string | null;
}

export interface ParadaNormalizada
  extends Omit<PedidoPendiente, "latitud" | "longitud">,
    Punto {
  latitud: number; // mantenemos los campos originales normalizados
  longitud: number;
}

/** ---- Tipos de OSRM ---- */
interface OSRMGeometry {
  coordinates: [number, number][];
}

interface OSRMRoute {
  geometry: OSRMGeometry;
}

interface OSRMResponse {
  routes: OSRMRoute[];
}

/** Cada ruta que devolvemos desde el service */
export interface RutaCalculada {
  coordenadas: { latitude: number; longitude: number }[];
  paradas: ParadaNormalizada[];
}

/** Normaliza y filtra las paradas que vienen del backend */
function normalizarParadas(data: PedidoPendiente[]): ParadaNormalizada[] {
  return data
    .filter((p) => p.latitud != null && p.longitud != null)
    .map((p) => {
      const lat =
        typeof p.latitud === "string" ? parseFloat(p.latitud) : (p.latitud as number);
      const lng =
        typeof p.longitud === "string" ? parseFloat(p.longitud) : (p.longitud as number);

      return {
        ...p,
        latitud: lat,
        longitud: lng,
        latitude: lat,
        longitude: lng,
      };
    })
    // filtro geográfico (ajustá según tu zona)
    .filter(
      (p) =>
        !Number.isNaN(p.latitude) &&
        !Number.isNaN(p.longitude) &&
        p.latitude >= -30 &&
        p.latitude <= -25 &&
        p.longitude >= -60 &&
        p.longitude <= -53
    );
}

export async function obtenerParadasAgrupadas(): Promise<RutaCalculada[]> {
  try {
    // Tipamos la respuesta del back
    const { data } = await apiPrivate.get<PedidoPendiente[]>("/paradas");

    const paradasValidas = normalizarParadas(data);
    const subgrupos = prepararGruposParaRutas(paradasValidas); // 👈 ahora TS ya sabe el tipo
    const rutas: RutaCalculada[] = [];

    for (const grupo of subgrupos) {
      if (grupo.length < 2) continue;

      const puntos = grupo.map((p) => `${p.longitude},${p.latitude}`).join(";");
      const url = `http://router.project-osrm.org/route/v1/driving/${puntos}?overview=full&geometries=geojson`;

      // Tipamos la respuesta de OSRM
      const rutaRes = await apiPrivate.get<OSRMResponse>(url);
      const rutaData = rutaRes.data;

      if (rutaData.routes && rutaData.routes.length > 0) {
        const coords = rutaData.routes[0].geometry.coordinates.map(
          ([lng, lat]) => ({
            latitude: lat,
            longitude: lng,
          })
        );

        rutas.push({ coordenadas: coords, paradas: grupo });
      }
    }

    return rutas;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error en obtenerParadasAgrupadas:", error.message);
    } else {
      console.error("Error en obtenerParadasAgrupadas:", error);
    }
    throw error;
  }
}
