import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SeleccionMunicipio from './src/screens/SeleccionMunicipio';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Seleccion">
        <Stack.Screen name="Seleccion" component={SeleccionMunicipio} options={{ title: 'ReciclApp' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
