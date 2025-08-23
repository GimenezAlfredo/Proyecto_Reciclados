import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../types/navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <ImageBackground
      source={require('../../assets/posadas.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.logoWrapper}>
          <Text style={styles.logoMain}>PROYECTO</Text>
          <View style={styles.logoBox}>
            <Text style={styles.logoSub}>RECICLAPP</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Iniciar sesión"
              onPress={() => navigation.navigate('Login')}
              color="#4CAF50"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Registrarse"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoMain: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1B2A41',
    letterSpacing: 2,
  },
  logoBox: {
    backgroundColor: '#1B2A41',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 4,
  },
  logoSub: {
    fontSize: 18,
    color: '#E8E4C9',
    letterSpacing: 3,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
});
