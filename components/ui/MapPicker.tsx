import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Map, { Marker as WebMarker } from 'react-map-gl';
import { MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface MapPickerProps {
  onLocationSelect: (latitude: number, longitude: number, address: string) => void;
  initialLocation?: {
    latitude: number;
    longitude: number;
  };
}

export default function MapPicker({ onLocationSelect, initialLocation }: MapPickerProps) {
  const [markerLocation, setMarkerLocation] = useState(
    initialLocation || {
      latitude: 35.6762,
      longitude: 139.6503,
    }
  );

  const handleMapPress = async (event: any) => {
    const coordinates = Platform.OS === 'web' 
      ? { latitude: event.lngLat.lat, longitude: event.lngLat.lng }
      : event.nativeEvent.coordinate;
    
    setMarkerLocation(coordinates);
    
    try {
      // Reverse geocoding using Mapbox API
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.longitude},${coordinates.latitude}.json?access_token=${process.env.EXPO_PUBLIC_MAPBOX_TOKEN}`
      );
      const data = await response.json();
      const address = data.features[0]?.place_name || 'Unknown location';
      onLocationSelect(coordinates.latitude, coordinates.longitude, address);
    } catch (error) {
      console.error('Error getting address:', error);
      onLocationSelect(coordinates.latitude, coordinates.longitude, 'Address lookup failed');
    }
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Map
          mapboxAccessToken={process.env.EXPO_PUBLIC_MAPBOX_TOKEN}
          initialViewState={{
            longitude: markerLocation.longitude,
            latitude: markerLocation.latitude,
            zoom: 14
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          onClick={handleMapPress}
        >
          <WebMarker
            longitude={markerLocation.longitude}
            latitude={markerLocation.latitude}
            draggable
            onDragEnd={handleMapPress}
          >
            <MapPin size={24} color={Colors.primary[500]} />
          </WebMarker>
        </Map>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          ...markerLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}
      >
        <Marker
          coordinate={markerLocation}
          draggable
          onDragEnd={handleMapPress}
        >
          <View style={styles.markerContainer}>
            <MapPin size={24} color={Colors.primary[500]} />
          </View>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: Layout.borderRadius.md,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    padding: 4,
  },
});