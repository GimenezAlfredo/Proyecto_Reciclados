import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { handleLogout } from '../../utils/logout-util';
import { useNavigation } from '@react-navigation/native';
import { obtenerParadasAgrupadas, RutaCalculada } from '../../api/services/paradas-service';
import CrudOpciones from "./crud-admin"; 


const HomeAdmin: React.FC = () => {
  const [rutas, setRutas] = useState<RutaCalculada[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);

  const [reciclaje] = useState([
    { id: 1, fecha: 'Hoy, 9:45 AM', detalle: '50kg plástico' },
    { id: 2, fecha: 'Ayer, 2:14 PM', detalle: '120kg cartón' },
    { id: 3, fecha: 'Viernes, 8:30 AM', detalle: '~320kg vidrio' },
  ]);

  const navigation = useNavigation<any>();

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
       {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>ReciclApp - Admin</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          {/* Logout */}
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>

          {/* Menú */}
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal menú */}
      <CrudOpciones visible={menuVisible} onClose={() => setMenuVisible(false)} />

      {/* Bienvenida */}
      <View style={styles.bienvenidaContainer}>
        <Text style={styles.bienvenida}>Bienvenido Richi </Text>
        <Text style={styles.fecha}> (25/08/2025) </Text>
      </View>

      <ScrollView>
        {/* Asignar pedidos */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Asignar Pedidos</Text>
          {rutas.map((ruta, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.numero}>{index + 1}</Text>
              <Text style={styles.info}>TIEMPO Y PARADAS</Text>
              <TouchableOpacity
                style={styles.botonVer}
                onPress={() => navigation.navigate('AsignarRuta', { rutaSeleccionada: index })}
              >
                <Text style={styles.botonTexto}>Ver ruta</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            style={styles.btnSecundario}
            onPress={() => navigation.navigate("PedidosAsignadosAdmin")}
          >
            <Text style={styles.btnSecundarioText}>Ver asignados</Text>
          </TouchableOpacity>
        </View>

        {/* Reciclaje semanal */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Reciclaje Semanal</Text>
          {reciclaje.map((item) => (
            <View key={item.id} style={styles.reciclajeRow}>
              <Ionicons name="leaf-outline" size={22} color="green" />
              <Text style={styles.reciclajeText}>
                {item.fecha}  {item.detalle}
              </Text>
            </View>
          ))}
          <TouchableOpacity style={styles.btnSecundario}>
            <Text style={styles.btnSecundarioText}>Ver movimientos</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeAdmin;

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
  headerIcons: { flexDirection: 'row', gap: 15 },

  bienvenidaContainer: { padding: 15 },
  bienvenida: { fontSize: 18, fontWeight: 'bold' },
  fecha: { fontSize: 14, color: 'gray' },

  card: {
    backgroundColor: '#eee',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
  },
  numero: { fontSize: 18, fontWeight: 'bold', marginRight: 15, color: 'green' },
  info: { flex: 1, fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  botonVer: {
    backgroundColor: 'green',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  botonTexto: { color: '#fff', fontWeight: 'bold' },

  btnSecundario: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: 'green',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  btnSecundarioText: { color: 'green', fontWeight: 'bold' },

  reciclajeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
  },
  reciclajeText: { marginLeft: 10, fontSize: 14 },
});
