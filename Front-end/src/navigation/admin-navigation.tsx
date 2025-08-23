import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeAdmin from '../screens/admin/home-admin'; // crea este componente
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AdminNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeAdmin"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF5722',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        ),
      }}
    >
      <Tab.Screen
        name="HomeAdmin"
        component={HomeAdmin}
        options={{ title: 'Inicio' }}
      />
    </Tab.Navigator>
  );
};

export default AdminNavigation;
