import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { handleLogout } from '../../utils/logout-util';

const HomeUsuario: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.logo}>ReciclApp</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="black" style={styles.logoutIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Cuerpo */}
      <View style={styles.body}>
        <Text style={styles.bienvenida}>Bienvenido, Usuario</Text>
        <Text style={styles.subtitulo}>Esta es la pantalla principal</Text>
      </View>
    </SafeAreaView>
  );
};

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
    gap: 15,
  },
  logoutIcon: {
    marginLeft: 5,
  },
  body: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bienvenida: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default HomeUsuario;
