import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeUsuario from '../screens/usuario/home-user';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const UsuarioPremiumNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeUsuario"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00b894',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        ),
      }}
    >
      <Tab.Screen
        name="HomeUsuario"
        component={HomeUsuario}
        options={{ title: 'Inicio' }}
      />
    </Tab.Navigator>
  );
};

export default UsuarioPremiumNavigation;
