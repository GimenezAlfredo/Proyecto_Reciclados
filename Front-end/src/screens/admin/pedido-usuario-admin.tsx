// screens/admin/PedidoUsuarioAdmin.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "PedidoUsuarioAdmin">;

const PedidoUsuarioAdmin: React.FC<Props> = ({ route }) => {
  const { pedido } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pedido actual</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Fecha solicitada:</Text>
        <Text style={styles.value}>{pedido.fecha || "No disponible"}</Text>

        <Text style={styles.label}>Dirección:</Text>
        <Text style={styles.value}>{pedido.direccion || "No disponible"}</Text>

        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.value}>{pedido.usuario || "No disponible"}</Text>

        <Text style={styles.label}>Tipo de reciclaje:</Text>
        <Text style={styles.value}>{pedido.tipoReciclaje || "No disponible"}</Text>

        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{pedido.estado}</Text>
      </View>
    </View>
  );
};

export default PedidoUsuarioAdmin;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  titulo: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  card: { backgroundColor: "#f2f2f2", padding: 15, borderRadius: 8 },
  label: { fontWeight: "bold", marginTop: 10 },
  value: { fontSize: 16, marginTop: 2 },
});
