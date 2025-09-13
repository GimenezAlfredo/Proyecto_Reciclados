// screens/admin/PedidosAsignadosAdmin.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';

interface PedidoAsignado {
  id: number;
  paradas: number;
  estado: "Sin comenzar" | "En proceso" | "Finalizado";
  recolector: string;
}

const PedidosAsignadosAdmin: React.FC = () => {
  const [pedidos, setPedidos] = useState<PedidoAsignado[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    const mockPedidos: PedidoAsignado[] = [
      { id: 1, paradas: 10, estado: "Sin comenzar", recolector: "Eduardo" },
      { id: 2, paradas: 7, estado: "En proceso", recolector: "Richard" },
      { id: 3, paradas: 5, estado: "Sin comenzar", recolector: "Stuart" },
      { id: 4, paradas: 9, estado: "En proceso", recolector: "Enrique" },
    ];
    setPedidos(mockPedidos);
  }, []);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Sin comenzar":
        return { color: "red" };
      case "En proceso":
        return { color: "orange" };
      case "Finalizado":
        return { color: "green" };
      default:
        return { color: "gray" };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pedidos Asignados</Text>
      <ScrollView style={{ width: "100%" }}>
        {pedidos.map((pedido) => (
          <View key={pedido.id} style={styles.card}>
            <Text style={styles.paradas}>
              {pedido.paradas} Paradas:{" "}
              <Text style={[styles.estado, getEstadoColor(pedido.estado)]}>
                {pedido.estado}
              </Text>
              {"   "}
              <Text style={styles.recolector}>Recolector: {pedido.recolector}</Text>
            </Text>

            <View style={styles.botones}>
              <TouchableOpacity
                style={styles.btnPrimario}
                onPress={() => navigation.navigate("PedidoUsuarioAdmin", { pedido })}
                >
                <Text style={styles.btnText}>Ver pedido</Text>
                </TouchableOpacity>

              <TouchableOpacity style={styles.btnSecundario}>
                <Text style={styles.btnText}>Ver proceso</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PedidosAsignadosAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#f2f2f2",
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 12,
    borderRadius: 8,
  },
  paradas: { fontSize: 16, marginBottom: 8 },
  estado: { fontWeight: "bold" },
  recolector: { color: "green", fontWeight: "600" },
  botones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  btnPrimario: {
    backgroundColor: "#1E40AF",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  btnSecundario: {
    backgroundColor: "#FACC15",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
