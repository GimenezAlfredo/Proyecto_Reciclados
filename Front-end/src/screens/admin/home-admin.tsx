import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { handleLogout } from '../../utils/logout-util';
import { obtenerParadasAgrupadas, RutaCalculada } from '../../api/services/paradas-service';
import MapaRutas from '../../components/mapa-rutas';

const HomeAdmin: React.FC = () => {
  const [nombre, setNombre] = useState('Admin');
  const [rutas, setRutas] = useState<RutaCalculada[]>([]);
  const [rutaSeleccionada, setRutaSeleccionada] = useState<number | null>(null);

  useEffect(() => {
    setNombre('Admin'); 
  }, []);

  useEffect(() => {
    const cargarRutas = async () => {
      try {
        const rutasObtenidas = await obtenerParadasAgrupadas();
        setRutas(rutasObtenidas);
      } catch (error) {
        console.warn('Error al obtener rutas:', error);
      }
    };
    cargarRutas();
  }, []);

  const seleccionarRuta = (index: number) => {
    setRutaSeleccionada(index);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.logo}>AdminApp</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="black" style={styles.logoutIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Cuerpo */}
      <View style={styles.body}>
        <Text style={styles.bienvenida}>{`Hola ${nombre}`}</Text>

        {/* Selector de rutas */}
        <ScrollView style={styles.selector}>
          {rutas.map((_, i) => (
            <View
              key={i}
              style={[
                styles.botonContenedor,
                { backgroundColor: i % 2 === 0 ? '#ffffff' : '#f0f0f0' },
              ]}
            >
              <Text style={styles.textoBoton}>Tiempo y Paradas</Text>
              <TouchableOpacity
                style={styles.verRutaBoton}
                onPress={() => seleccionarRuta(i)}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ver ruta</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Mapa de rutas */}
        <View style={styles.mapaContenedor}>
          <MapaRutas rutas={rutas} rutaSeleccionada={rutaSeleccionada} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeAdmin;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FFD700',
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIcon: {
    marginLeft: 5,
  },
  body: {
    flex: 1,
    paddingHorizontal: 10,
  },
  bienvenida: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  selector: {
    maxHeight: 150,
    marginBottom: 10,
  },
  botonContenedor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  verRutaBoton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  mapaContenedor: {
    flex: 1,
    overflow: 'hidden',
  },
});
