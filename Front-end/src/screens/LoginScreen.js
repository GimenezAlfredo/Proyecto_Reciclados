import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

export default function LoginScreen({ route }) {
  const { municipio } = route.params;
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#87CEEB" />
    <Text style={styles.titulo}>Municipio seleccionado:</Text>
    <Text style={styles.municipio}>{municipio.label}</Text>


      <TextInput
        placeholder="Nombre de usuario"
        value={usuario}
        onChangeText={setUsuario}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.boton}>
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
