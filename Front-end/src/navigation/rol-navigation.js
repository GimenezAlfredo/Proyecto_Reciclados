import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getUser } from '../auth/auth';
import RecolectorNavigation from './recolector-navigation';
import AdminNavigation from './admin-navigation';
import NotFoundScreen from '../screens/notfound-screen';

export default function RolNavigation() {
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificarRol = async () => {
      const user = await getUser();
      console.log({user})
      if (user && user.rol !== undefined) {
        setRol(user.rol);
      }

      setLoading(false);
    };

    verificarRol();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  switch (rol) {
    case 1:
      return <AdminNavigation />;
    case 2:
      return <RecolectorNavigation />;
    default:
      return <NotFoundScreen />;
  }
}
