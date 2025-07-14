import axios from 'axios'
import { prepararGruposParaRutas } from '../utils/agrupadorRutas.js'

export async function obtenerParadasAgrupadas() {
  try {
    const { data } = await axios.get('http://192.168.1.39:3000/api/paradas')

    const paradasValidas = data
      .filter(p =>
        parseFloat(p.latitud) >= -30 && parseFloat(p.latitud) <= -25 &&
        parseFloat(p.longitud) >= -60 && parseFloat(p.longitud) <= -53
      )
      .map(p => ({
        ...p,
        latitude: parseFloat(p.latitud),
        longitude: parseFloat(p.longitud),
      }))

    const subgrupos = prepararGruposParaRutas(paradasValidas)
    const rutas = []

    for (const grupo of subgrupos) {
      if (grupo.length < 2) continue

      const puntos = grupo.map(p => `${p.longitude},${p.latitude}`).join(';')
      const url = `http://router.project-osrm.org/route/v1/driving/${puntos}?overview=full&geometries=geojson`

      const rutaRes = await axios.get(url)
      const rutaData = rutaRes.data

      if (rutaData.routes && rutaData.routes.length > 0) {
        const coords = rutaData.routes[0].geometry.coordinates.map(([lng, lat]) => ({
          latitude: lat,
          longitude: lng
        }))

        rutas.push({ coordenadas: coords, paradas: grupo })
      }
    }

    return rutas

  } catch (error) {
    console.error('Error al obtener rutas:', error.message)
    return []
  }
}
