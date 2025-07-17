import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, Alert
} from 'react-native';
import { loginUsuario } from '../api/login.js'; 
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ route }) {
  const { municipio } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos requeridos', 'Por favor ingrese email y contraseña.');
      return;
    }

  try {
    const response = await loginUsuario(email, password);
    if (response.ok) {
      Alert.alert('Bienvenido', response.mensaje);
      navigation.navigate('HomeScreen'); 
    } else {
      Alert.alert('Error', response.mensaje || 'Error desconocido');
    } } catch (error) {
    console.error('ERROR GENERAL:', error); // 👈 Error inesperado
    Alert.alert('Error inesperado', 'Ocurrió un problema al intentar iniciar sesión');
  }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#87CEEB" />
      <Text style={styles.titulo}>Municipio seleccionado:</Text>
      <Text style={styles.municipio}>{municipio.label}</Text>

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.boton} onPress={handleLogin}>
        <Text style={styles.botonTexto}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  titulo: { fontSize: 18, fontWeight: '600' },
  municipio: { fontSize: 20, marginBottom: 20, color: '#005C41' },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15
  },
  boton: {
    backgroundColor: '#005C41',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold'
  }
});
