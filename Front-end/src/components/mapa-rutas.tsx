// src/components/mapa-rutas.tsx
import React, { useRef } from "react";
import MapView, { Marker, Polyline, MapViewProps } from "react-native-maps";
import { StyleSheet } from "react-native";
import { RutaCalculada } from "../api/services/paradas-service"; // ajustá la ruta según tu proyecto

interface MapaRutasProps {
  rutas: RutaCalculada[];
  rutaSeleccionada: number | null;
}

export default function MapaRutas({ rutas, rutaSeleccionada }: MapaRutasProps) {
  const mapRef = useRef<MapView | null>(null);

  if (rutaSeleccionada === null || !rutas[rutaSeleccionada]) return null;

  const ruta = rutas[rutaSeleccionada];

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        latitude: -27.3623,
        longitude: -55.9009,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {ruta.paradas.map((parada, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: parada.latitude,
            longitude: parada.longitude,
          }}
          title={`${parada.calle} ${parada.numero}`}
        />
      ))}

      <Polyline
        coordinates={ruta.coordenadas}
        strokeColor="blue"
        strokeWidth={4}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
