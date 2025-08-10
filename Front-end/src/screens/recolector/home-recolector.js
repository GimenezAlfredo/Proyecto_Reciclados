import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {handleLogout} from '../../utils/logout-util'
import { userName } from '../../utils/username-util';

export default function RecolectorScreen({ navigation }) {
  const [nombre, setNombre] = useState('');

   useEffect(() => {
    userName(setNombre);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.logo}>ReciclApp</Text>
          <View style={styles.iconContainer}>
        <Ionicons name="help-circle-outline" size={22} color="green" />
        <Ionicons name="notifications-outline" size={22} color="white" style={styles.bellIcon} />
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="red" style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>

        </View>

        {/* Cuerpo scrollable */}
        <ScrollView contentContainerStyle={[styles.body, { paddingBottom: 20 }]}>
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
  },
    header: {
      flexDirection: 'row',
      backgroundColor: '#FFD700',
      paddingTop: 40,        
      paddingBottom: 20,      
      paddingHorizontal: 20, 
      alignItems: 'center',
      justifyContent: 'space-between',
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoutIcon: {
    marginLeft: 10,
  }

});
