import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeRecolector from '../screens/recolector/home-recolector';
import HistorialRecolector from '../screens/recolector/historial-recolector';
import TareasRecolector from '../screens/recolector/tareas-recolector';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function RecolectorNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="HomeRecolector"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'HomeRecolector':
              iconName = 'home';
              break;
            case 'TareasRecolector':
              iconName = 'clipboard';
              break;
            case 'HistorialRecolector':
              iconName = 'time';
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
        name="HomeRecolector"
        component={HomeRecolector}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen
        name="TareasRecolector"
        component={TareasRecolector}
        options={{ title: 'Tareas' }}
      />
      <Tab.Screen
        name="HistorialRecolector"
        component={HistorialRecolector}
        options={{ title: 'Historial' }}
      />
    </Tab.Navigator>
  );
}
