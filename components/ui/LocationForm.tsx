import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { MapPin } from 'lucide-react-native';
import Button from './Button';
import MapPicker from './MapPicker';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface LocationFormProps {
  onSubmit: (data: LocationFormData) => void;
  loading?: boolean;
  gridPosition: { x: number; y: number };
}

export interface LocationFormData {
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  gridPositionX: number;
  gridPositionY: number;
}

export default function LocationForm({ onSubmit, loading = false, gridPosition }: LocationFormProps) {
  const [formData, setFormData] = useState<LocationFormData>({
    title: '',
    description: '',
    address: '',
    latitude: 0,
    longitude: 0,
    gridPositionX: gridPosition.x,
    gridPositionY: gridPosition.y,
  });

  const handleLocationSelect = (latitude: number, longitude: number, address: string) => {
    setFormData(prev => ({
      ...prev,
      latitude,
      longitude,
      address,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const isFormValid = () => {
    return (
      formData.title.trim() !== '' &&
      formData.description.trim() !== '' &&
      formData.address !== '' &&
      formData.latitude !== 0 &&
      formData.longitude !== 0
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location Details</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Location Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            placeholder="Enter location name"
            placeholderTextColor={Colors.neutrals[400]}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="Describe the location and any special instructions"
            placeholderTextColor={Colors.neutrals[400]}
            multiline
            numberOfLines={4}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Map Location</Text>
        <Text style={styles.sectionSubtitle}>
          Select the exact location where the QR code will be placed
        </Text>

        <View style={styles.mapContainer}>
          <MapPicker
            onLocationSelect={handleLocationSelect}
            initialLocation={{
              latitude: formData.latitude,
              longitude: formData.longitude,
            }}
          />
        </View>

        <View style={styles.locationInfo}>
          <MapPin size={20} color={Colors.primary[500]} />
          <Text style={styles.address} numberOfLines={2}>
            {formData.address || 'No location selected'}
          </Text>
        </View>

        <Text style={styles.gridPosition}>
          Grid Position: ({gridPosition.x + 1}, {gridPosition.y + 1})
        </Text>
      </View>

      <Button
        title="Save Location"
        onPress={handleSubmit}
        disabled={!isFormValid() || loading}
        loading={loading}
        style={styles.submitButton}
        fullWidth
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.neutrals[900],
    marginBottom: Layout.spacing.xs,
  },
  sectionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[600],
    marginBottom: Layout.spacing.md,
  },
  formGroup: {
    marginBottom: Layout.spacing.lg,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutrals[800],
    marginBottom: Layout.spacing.xs,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.neutrals[300],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutrals[900],
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  mapContainer: {
    height: 300,
    borderRadius: Layout.borderRadius.md,
    overflow: 'hidden',
    marginBottom: Layout.spacing.md,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutrals[100],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.sm,
  },
  address: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[800],
    marginLeft: Layout.spacing.sm,
  },
  gridPosition: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[700],
    textAlign: 'center',
  },
  submitButton: {
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.xl,
  },
});