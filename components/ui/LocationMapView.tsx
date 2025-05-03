import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Map, { Marker as WebMarker } from 'react-map-gl';
import { MapPin } from 'lucide-react-native';
import { Location } from '@/types';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface LocationMapViewProps {
  locations: Location[];
  collectedLocations: string[];
  userLocation?: { latitude: number; longitude: number };
  onMarkerPress?: (location: Location) => void;
  style?: any;
}

export default function LocationMapView({
  locations,
  collectedLocations,
  userLocation,
  onMarkerPress,
  style,
}: LocationMapViewProps) {
  const getInitialRegion = () => {
    if (locations.length === 0) {
      return {
        latitude: 35.6762,
        longitude: 139.6503,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }

    const lats = locations.map(l => l.latitude);
    const lngs = locations.map(l => l.longitude);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: (maxLat - minLat) * 1.5,
      longitudeDelta: (maxLng - minLng) * 1.5,
    };
  };

  if (Platform.OS === 'web') {
    const initialRegion = getInitialRegion();
    return (
      <View style={[styles.container, style]}>
        <Map
          mapboxAccessToken={process.env.EXPO_PUBLIC_MAPBOX_TOKEN}
          initialViewState={{
            longitude: initialRegion.longitude,
            latitude: initialRegion.latitude,
            zoom: 12
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
        >
          {locations.map((location) => (
            <WebMarker
              key={location.id}
              longitude={location.longitude}
              latitude={location.latitude}
              onClick={() => onMarkerPress?.(location)}
            >
              <MapPin
                size={24}
                color={collectedLocations.includes(location.id) ? Colors.success[500] : Colors.primary[500]}
              />
            </WebMarker>
          ))}
        </Map>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={getInitialRegion()}
        showsUserLocation={!!userLocation}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            onPress={() => onMarkerPress?.(location)}
          >
            <View style={styles.markerContainer}>
              <MapPin
                size={24}
                color={collectedLocations.includes(location.id) ? Colors.success[500] : Colors.primary[500]}
              />
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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