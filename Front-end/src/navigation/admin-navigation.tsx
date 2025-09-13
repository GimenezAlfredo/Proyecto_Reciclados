// navigation/AdminNavigation.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeAdmin from "../screens/admin/home-admin";
import AsignarRuta from "../screens/admin/asignar-ruta-admin";
import PedidosAsignadosAdmin from "../screens/admin/pedidos-asignados-admin";
import PedidoUsuarioAdmin from "../screens/admin/pedido-usuario-admin";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack para manejar navegación interna de Admin
const AdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
      <Stack.Screen name="AsignarRuta" component={AsignarRuta} />
      <Stack.Screen name="PedidosAsignadosAdmin" component={PedidosAsignadosAdmin} />
      <Stack.Screen
        name="PedidoUsuarioAdmin"
        component={PedidoUsuarioAdmin}
        options={{ headerShown: true, title: "Pedido" }}
      />
    </Stack.Navigator>
  );
};

const AdminNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="AdminStack"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF5722",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="AdminStack"
        component={AdminStack}
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminNavigation;
