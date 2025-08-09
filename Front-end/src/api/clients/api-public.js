import axios from 'axios';
import Constants from 'expo-constants';

const { apiUrl } = Constants.expoConfig.extra;

const apiPublic = axios.create({
  baseURL: apiUrl,
});

export default apiPublic;
