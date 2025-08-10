import * as SecureStore from 'expo-secure-store';

const USER_KEY = 'userInfo';
const TOKEN_KEY = 'authToken';

export const saveUser = async (user) => {
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
};

export const getUser = async () => {
  const user = await SecureStore.getItemAsync(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const deleteUser = async () => {
  await SecureStore.deleteItemAsync(USER_KEY);
};

export const saveToken = async (token) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const getToken = async () => {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  return token;
};

export const deleteToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};
