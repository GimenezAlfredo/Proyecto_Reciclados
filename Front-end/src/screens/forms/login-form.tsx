import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import { loginUsuario } from '../../api/services/login-service';
import { saveToken, saveUser } from '../../auth/auth';
import { navigate } from '../../navigation/refglobal-navigation'; 

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos requeridos', 'Por favor ingrese email y contraseña.');
      return;
    }

    try {
      const response = await loginUsuario(email, password);

      if (response.ok) {
        await saveToken(response.token);
        await saveUser(response.user);

        // Navegación usando ref global
        navigate('RolNavigation');

      } else {
        Alert.alert('Error', response.mensaje);
      }
    } catch (error) {
      console.error('ERROR GENERAL:', error);
      Alert.alert('Error inesperado', 'Ocurrió un problema al intentar iniciar sesión');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  boton: {
    backgroundColor: '#005C41',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
});
