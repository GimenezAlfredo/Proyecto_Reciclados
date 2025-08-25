//contrato de rutas para que TS te dé autocompletado y type-safety en navigate.

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  RolNavigation: undefined;
};
// // src/types/navigation.d.ts
// import { NavigatorScreenParams } from "@react-navigation/native";

// export type RootStackParamList = {
//   Home: undefined;
//   HistorialUsuario: { userId: string } | undefined;
//   Perfil: undefined;
// };

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }
