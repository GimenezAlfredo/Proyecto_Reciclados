import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { obtenerParadasAgrupadas } from '../../api/services/paradas-service.js'
import MapaRutas from '../../components/mapa-rutas.js'

export default function TareasRecolector() {
  const [rutas, setRutas] = useState([])
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null)

   useEffect(() => {
    const cargarRutas = async () => {
      try {
        const rutasObtenidas = await obtenerParadasAgrupadas()
        setRutas(rutasObtenidas)
      } catch (error) {
        console.warn('Error al obtener rutas:', error)
      }
    }
    cargarRutas()
  }, [])

  const seleccionarRuta = (index) => {
    setRutaSeleccionada(index)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Seleccioná una Ruta</Text>
      </View>

      <ScrollView style={styles.selector}>
        {rutas.map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.botonRuta,
              { backgroundColor: i % 2 === 0 ? '#ffffff' : '#f0f0f0' }
            ]}
            onPress={() => seleccionarRuta(i)}
          >
            <Text style={styles.textoBoton}>Ruta {i + 1}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.mapaContenedor}>
        <MapaRutas
          rutas={rutas}
          rutaSeleccionada={rutaSeleccionada}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  selector: {
    maxHeight: 150,
    paddingHorizontal: 10,
  },
  botonRuta: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  textoBoton: {
    color: '#333',
    fontWeight: 'bold',
  },
  mapaContenedor: {
    flex: 1, 
    overflow: 'hidden',
  },
})
