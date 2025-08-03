import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { getUser } from '../../auth/auth'; // 🔁 Asegurate de que esta ruta sea correcta

export default function RecolectorScreen({ navigation }) {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const cargarUsuario = async () => {
      const user = await getUser();
      if (user && user.nombre) {
        setNombre(user.nombre);
        console.log('Usuario autenticado:', user); // 🔍
      } else {
        console.warn('No se encontró usuario');
      }
    };

    cargarUsuario();
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.logo}>ReciclApp</Text>
          <Ionicons name="help-circle-outline" size={22} color="green" />
          <Ionicons name="notifications-outline" size={22} color="white" style={styles.bellIcon} />
        </View>

        {/* Cuerpo scrollable */}
        <ScrollView contentContainerStyle={styles.body}>
          <Text style={styles.bienvenida}>Bienvenido {nombre || '...'}</Text>
          <Text style={styles.fecha}>Fecha</Text>

          <Text style={styles.subtitulo}>Pedidos Asignados</Text>
          {[1, 2].map((item) => (
            <View key={item} style={styles.card}>
              <Text style={styles.cardTexto}>10 paradas, tiempo estimado 30m</Text>
              <TouchableOpacity style={styles.botonVerRuta}>
                <Text style={styles.botonTexto}>Ver ruta</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.botonVerLista}
            onPress={() => navigation.navigate('TareasRecolector')}
          >
            <Text style={styles.botonVerListaTexto}>Ver Lista  ➤</Text>
          </TouchableOpacity>

          <Text style={styles.subtitulo}>Últimas Recolecciones</Text>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.recoleccionItem}>
              <Image
                source={require('../../../assets/truck-icon.png')}
                style={styles.iconoRecoleccion}
              />
              <Text style={styles.recoleccionTexto}>Texto de recolección</Text>
            </View>
          ))}

          <TouchableOpacity
            style={styles.botonVerHistorial}
            onPress={() => navigation.navigate('HistorialRecolector')}
          >
            <Text style={styles.botonVerListaTexto}>Ver Historial  ➤</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Footer */}
        <View style={[styles.footer, { paddingBottom: 10 }]}>
          <View style={styles.footerItem}>
            <Ionicons name="home" size={24} color="white" />
            <Text style={styles.footerTexto}>Home</Text>
          </View>
          <View style={styles.footerItem}>
            <Ionicons name="refresh" size={24} color="white" />
          </View>
          <View style={styles.footerItem}>
            <FontAwesome name="user" size={24} color="white" />
            <Text style={styles.footerTexto}>Perfil</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    paddingBottom: 70
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FFD700',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#005C41'
  },
  bellIcon: {
    marginLeft: 10
  },
  body: {
    padding: 20
  },
  bienvenida: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4
  },
  fecha: {
    marginBottom: 20,
    color: 'gray'
  },
  subtitulo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10
  },
  card: {
    backgroundColor: '#eee',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8
  },
  cardTexto: {
    flex: 1,
    fontSize: 14
  },
  botonVerRuta: {
    backgroundColor: '#005C41',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold'
  },
  botonVerLista: {
    alignSelf: 'flex-end',
    marginVertical: 10
  },
  botonVerListaTexto: {
    color: '#005C41',
    fontWeight: 'bold'
  },
  recoleccionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },
  iconoRecoleccion: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  recoleccionTexto: {
    fontSize: 14
  },
  botonVerHistorial: {
    alignSelf: 'flex-end',
    marginTop: 5
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFD700',
    paddingVertical: 10
  },
  footerItem: {
    alignItems: 'center'
  },
  footerTexto: {
    fontSize: 12,
    color: 'white',
    marginTop: 2
  }
});
