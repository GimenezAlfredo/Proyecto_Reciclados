import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'

export default function App() {
  const [paradas, setParadas] = useState([])
  const [ruta, setRuta] = useState([])

  useEffect(() => {
    fetchParadas()
  }, [])

  const fetchParadas = async () => {
    try {
      const response = await fetch('http://192.168.1.3:3000/api/paradas')
      const data = await response.json()
      setParadas(data)
      obtenerRutaDesdeOSRM(data)
    } catch (error) {
      console.error('Error al obtener paradas:', error)
    }
  }

  const obtenerRutaDesdeOSRM = async (paradas) => {
    const puntos = paradas.map(p => `${p.longitud},${p.latitud}`).join(';')
    const url = `http://router.project-osrm.org/route/v1/driving/${puntos}?overview=full&geometries=geojson`

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (!data.routes || data.routes.length === 0) {
        console.warn('No se encontraron rutas')
        return
      }

      const coords = data.routes[0].geometry.coordinates.map(([lng, lat]) => ({
        latitude: lat,
        longitude: lng
      }))
      setRuta(coords)
    } catch (error) {
      console.error('Error al procesar la ruta:', error)
    }
  }


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.2465,
          longitude: -103.7225,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
      {paradas.map(parada => (
        <Marker
          key={parada.idusuario}
          coordinate={{
            latitude: parseFloat(parada.latitud),
            longitude: parseFloat(parada.longitud),
          }}
          title={parada.nombre}
        />
      ))}



        {ruta.length > 0 && (
          <Polyline
            coordinates={ruta}
            strokeColor="blue"
            strokeWidth={4}
          />
        )}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  }
})
