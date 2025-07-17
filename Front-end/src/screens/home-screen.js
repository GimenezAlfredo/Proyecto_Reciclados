import React, { useState } from 'react'
import { View, Button, ScrollView, StyleSheet } from 'react-native'
import { obtenerParadasAgrupadas } from '../api/paradas.js'
import MapaRutas from '../components/mapa-rutas.js'

export default function HomeScreen() {
  const [rutas, setRutas] = useState([])
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null)
  const [mostrarMapa, setMostrarMapa] = useState(false)

  const manejarVerRutas = async () => {
    const rutasObtenidas = await obtenerParadasAgrupadas()
    setRutas(rutasObtenidas)
    setMostrarMapa(true)
  }

  const seleccionarRuta = (index) => {
    setRutaSeleccionada(index)
  }

  return (
    <View style={styles.container}>
      {!mostrarMapa ? (
        <Button title="Ver rutas disponibles" onPress={manejarVerRutas} />
      ) : (
        <>
          <ScrollView horizontal style={styles.selector}>
            {rutas.map((_, i) => (
              <Button key={i} title={`Ruta ${i + 1}`} onPress={() => seleccionarRuta(i)} />
            ))}
          </ScrollView>

          <MapaRutas
            rutas={rutas}
            rutaSeleccionada={rutaSeleccionada}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selector: {
    backgroundColor: '#eee',
    padding: 5,
    maxHeight: 50,
  },
})
