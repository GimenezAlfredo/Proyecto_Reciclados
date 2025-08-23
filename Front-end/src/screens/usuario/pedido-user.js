import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { verPedido } from '../../api/services/verpedido-service';

export default function PedidoUsuario({ route }) {
  const { fecha } = route.params;
  const [pedido, setPedido] = useState(null);
  const [detalle, setDetalle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPedido = async () => {
      try {
        const data = await verPedido(fecha);
        setPedido(data.pedido);
        setDetalle(data.detalle);
      } catch (error) {
        console.error('Error al cargar pedido:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarPedido();
  }, [fecha]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (!pedido) {
    return (
      <View style={styles.container}>
        <Text>No se encontró el pedido</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Bloque Pedido actual */}
      <View style={styles.pedidoContainer}>
        <Text style={styles.sectionTitle}>Pedido actual</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Fecha solicitada:</Text>
          <Text style={styles.value}>{pedido.fecha_emision}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Dirección:</Text>
          <Text style={styles.value}>
            {pedido.calle} {pedido.numero}, {pedido.barrio} ({pedido.referencias})
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Recolector a cargo:</Text>
          <Text style={styles.value}>{pedido.recolector}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tipo de reciclaje:</Text>
          <Text style={styles.value}>
            {detalle.map((item) => item.tipo_reciclable).join(', ')}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Estado:</Text>
          <Text style={styles.value}>{pedido.estado}</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Quitar pedido</Text>
        </TouchableOpacity>
      </View>

      {/* Bloque Chat */}
      <View style={styles.chatContainer}>
        <Text style={styles.sectionTitle}>Chat con Recolector</Text>
        <View style={styles.chatBox}>
          <Text style={{ textAlign: 'center', fontSize: 24 }}>💬</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f0f0' 
  },
  scrollContent: {
    flexGrow: 1,              // Permite que ScrollView ocupe todo el espacio
    justifyContent: 'center',  // Centra verticalmente
    padding: 16
  },
  pedidoContainer: { 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 8, 
    marginBottom: 20 
  },
  chatContainer: { 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 8, 
    marginBottom: 20 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 12 
  },
  row: { 
    flexDirection: 'row', 
    marginBottom: 8 
  },
  label: { 
    fontWeight: 'bold', 
    width: 140 
  },
  value: { 
    flex: 1, 
    backgroundColor: '#e0e0e0', 
    padding: 4, 
    borderRadius: 4 
  },
  button: { 
    backgroundColor: '#c00', 
    padding: 10, 
    borderRadius: 4, 
    alignSelf: 'flex-end', 
    marginTop: 10 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  chatBox: { 
    height: 120, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 4, 
    justifyContent: 'center' 
  },
});
