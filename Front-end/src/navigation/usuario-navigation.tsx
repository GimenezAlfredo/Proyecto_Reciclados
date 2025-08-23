import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeUsuario from '../screens/usuario/home-user';
import { Ionicons } from '@expo/vector-icons';

export type UsuarioTabParamList = {
  HomeUsuario: undefined;
};

const Tab = createBottomTabNavigator<UsuarioTabParamList>();

const UsuarioNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeUsuario"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'HomeUsuario':
              iconName = 'home';
              break;
            default:
              iconName = 'help';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00b894',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="HomeUsuario"
        component={HomeUsuario}
        options={{ title: 'Inicio' }}
      />
    </Tab.Navigator>
  );
};

export default UsuarioNavigation;
