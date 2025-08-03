import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  SafeAreaView, StatusBar, StyleSheet, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { obtenerMunicipios } from '../../api/municipios';

const logo = require('../../../assets/logo.png');
const bgimagen = require('../../../assets/posadas.jpeg');

export default function SeleccionMunicipio({ navigation }) {
  const [selectedMunicipio, setSelectedMunicipio] = useState(null);
  const [municipios, setMunicipios] = useState([{ label: 'Cargando...', value: '' }]);

  useEffect(() => {
    const cargarMunicipios = async () => {
      try {
        const data = await obtenerMunicipios();
        setMunicipios([{ label: 'Seleccione...', value: '' }, ...data]);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los municipios.');
        setMunicipios([{ label: 'Error', value: '' }]);
      }
    };
    cargarMunicipios();
  }, []);

 const manejarContinuar = () => {
  if (!selectedMunicipio) {
    Alert.alert('Atención', 'Seleccione un municipio.');
    return;
  }
  navigation.navigate('Login', { municipio: selectedMunicipio });
};


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#87CEEB" />
      <Image source={bgimagen} style={styles.backgroundImage} />
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.card}>
        <Text style={styles.selectText}>Seleccione su Municipio</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedMunicipio?.value}
            onValueChange={(itemValue) => {
                const municipioSeleccionado = municipios.find(m => m.value === itemValue);
                setSelectedMunicipio(municipioSeleccionado);
            }}
            style={styles.picker}
            >
            {municipios.map((m) => (
                <Picker.Item key={m.value} label={m.label} value={m.value} />
            ))}
        </Picker>
        </View>
        <TouchableOpacity style={styles.continueButton} onPress={manejarContinuar}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    marginHorizontal: 30,
    marginTop: 100,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#143D60',
    marginBottom: 15,
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  continueButton: {
    backgroundColor: '#005C41',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
