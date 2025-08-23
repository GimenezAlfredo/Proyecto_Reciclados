import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { getUser } from "../auth/auth";
import AdminNavigation from "./admin-navigation";
import UsuarioNavigation from "./usuario-navigation";
import UsuarioPremiunNavigation from "./usuario-premiun-navigation";
import NotFoundScreen from "../screens/notfound-screen.js";

interface User {
  rol?: number;
  [key: string]: any;
}

const RolNavigation: React.FC = () => {
  const [rol, setRol] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verificarRol = async () => {
      const user: User | null = await getUser();
      if (user?.rol !== undefined) setRol(user.rol);
      setLoading(false);
    };
    verificarRol();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  switch (rol) {
    case 1:
      return <AdminNavigation />;
    case 2:
      return <UsuarioPremiunNavigation />;
    case 3:
      return <UsuarioNavigation />;
    default:
      return <NotFoundScreen />;
  }
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RolNavigation;
