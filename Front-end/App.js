import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SeleccionMunicipio from './src/screens/seleccion-municipio';
import LoginScreen from './src/screens/login-screen';
import HomeScreen from './src/screens/home-screen'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Seleccion">
        <Stack.Screen name="Seleccion" component={SeleccionMunicipio} options={{ title: 'ReciclApp' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Inicio' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
