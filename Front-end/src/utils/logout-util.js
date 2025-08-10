import { Alert } from 'react-native';
import { deleteUser, deleteToken } from '../auth/auth';
import { resetToLogin } from '../navigation/refglobal-navigation'; 

export const handleLogout = () => {
  Alert.alert(
    'Cerrar sesión',
    '¿Estás seguro de que deseas salir?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Salir',
        style: 'destructive',
        onPress: async () => {
          await deleteUser();
          await deleteToken();
          resetToLogin(); 
        },
      },
    ]
  );
};
