// asignar-ruta-admin.tsx
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { handleLogout } from '../../utils/logout-util';
import { useRoute } from '@react-navigation/native';
import { obtenerParadasAgrupadas, RutaCalculada } from '../../api/services/paradas-service';
import MapaRutas from '../../components/mapa-rutas';

const AsignarRuta: React.FC = () => {
  const route = useRoute<any>();
  const { rutaSeleccionada } = route.params;

  const [rutas, setRutas] = useState<RutaCalculada[]>([]);
  const [recolectores, setRecolectores] = useState<string[]>(["Eduardo", "Rodri"]);

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

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.logo}>ReciclApp</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="black" style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>

      {/* Mapa */}
      <View style={styles.mapContainer}>
        <Text style={styles.titulo}>Ruta seleccionada #{rutaSeleccionada + 1}</Text>
        <MapaRutas rutas={rutas} rutaSeleccionada={rutaSeleccionada} />
      </View>

      {/* Recolectores disponibles */}
      <View style={styles.recolectoresContainer}>
        <Text style={styles.subtitulo}>Recolectores disponibles</Text>
        <FlatList
          data={recolectores}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.recolectorItem}>
              <Text style={styles.nombreRecolector}>{item}</Text>
              <TouchableOpacity style={styles.botonAsignar}>
                <Text style={styles.textoAsignar}>Asignar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default AsignarRuta;

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FFD700',
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  logoutIcon: { marginLeft: 10 },

  mapContainer: { flex: 1, padding: 10 },
  titulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },

  recolectoresContainer: {
    backgroundColor: '#eee',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  subtitulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  recolectorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginBottom: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  nombreRecolector: { fontSize: 14, fontWeight: '600' },
  botonAsignar: {
    backgroundColor: '#1976D2',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 5,
  },
  textoAsignar: { color: '#fff', fontWeight: 'bold' },
});
