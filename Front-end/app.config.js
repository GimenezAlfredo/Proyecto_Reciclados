import 'dotenv/config';

export default {
  expo: {
    name: "Reciclap",
    slug: "reciclap",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon-recolectapp.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-reciclaje.jpg",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      package: "com.alfred45.reciclap",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: ["expo-secure-store"],
    updates: {
    url: "https://u.expo.dev/68952eb6-c97b-4653-8aef-8d1c4bf524d7"
    },
    runtimeVersion: {
      policy: "appVersion"
    },
    extra: {
      apiUrl: process.env.API_URL,
      eas: {
        projectId: "68952eb6-c97b-4653-8aef-8d1c4bf524d7"
      }
    }
  }
};
