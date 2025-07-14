import { DBSCAN } from 'density-clustering'

export function prepararGruposParaRutas(puntos, maxPuntos = 10, distancia = 0.03, minPts = 2) {
  const dbscan = new DBSCAN()
  const coords = puntos.map(p => [p.latitude, p.longitude])
  const clusters = dbscan.run(coords, distancia, minPts)

  const agrupados = clusters.map(clusterIndices =>
    clusterIndices.map(i => puntos[i])
  )

  // Agregar puntos sueltos
  const outliers = puntos.filter((_, i) => !clusters.flat().includes(i))
  if (outliers.length > 0) agrupados.push(...outliers.map(p => [p]))

  // Dividir cada grupo grande en subgrupos de hasta maxPuntos
  const subgrupos = []
  for (const grupo of agrupados) {
    for (let i = 0; i < grupo.length; i += maxPuntos) {
      const chunk = grupo.slice(i, i + maxPuntos)
      if (chunk.length > 1) subgrupos.push(chunk) // solo 2 o más puntos
    }
  }

  return subgrupos
}
