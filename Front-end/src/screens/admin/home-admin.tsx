import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { handleLogout } from '../../utils/logout-util';

const HomeAdmin: React.FC = () => {
  const [nombre, setNombre] = useState('Admin');

  useEffect(() => {
    // Si quieres, aquí podrías obtener el nombre real del admin desde auth
    setNombre('Admin');
  }, []);

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  bienvenida: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
