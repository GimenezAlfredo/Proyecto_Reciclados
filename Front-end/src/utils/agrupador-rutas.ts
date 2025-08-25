// src/utils/agrupador-rutas.ts
import { DBSCAN } from "density-clustering";

export interface Punto {
  latitude: number;
  longitude: number;
  [key: string]: any;
}

export function prepararGruposParaRutas<T extends Punto>(
  puntos: T[],
  maxPuntos: number = 10,
  distancia: number = 0.03,
  minPts: number = 2
): T[][] {
  const dbscan = new DBSCAN();
  const coords = puntos.map((p) => [p.latitude, p.longitude]);
  const clusters: number[][] = dbscan.run(coords, distancia, minPts);

  const agrupados: T[][] = clusters.map((clusterIndices) =>
    clusterIndices.map((i) => puntos[i])
  );

  // Agregar puntos sueltos (outliers)
  const outliers = puntos.filter((_, i) => !clusters.flat().includes(i));
  if (outliers.length > 0) agrupados.push(...outliers.map((p) => [p]));

  // Dividir grupos grandes en subgrupos
  const subgrupos: T[][] = [];
  for (const grupo of agrupados) {
    for (let i = 0; i < grupo.length; i += maxPuntos) {
      const chunk = grupo.slice(i, i + maxPuntos);
      if (chunk.length > 1) subgrupos.push(chunk);
    }
  }

  return subgrupos;
}
