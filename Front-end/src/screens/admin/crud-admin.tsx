import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const CrudOpciones: React.FC<Props> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.text}>Cargar usuario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.text}>Modificar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.text}>Desactivar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.text}>Ver usuario</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CrudOpciones;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menu: {
    backgroundColor: "#fff",
    marginTop: 70,
    marginRight: 15,
    borderRadius: 8,
    paddingVertical: 10,
    width: 200,
    elevation: 5,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
