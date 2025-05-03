import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Crop, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react-native';
import Button from './Button';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface ImageEditorProps {
  imageUrl: string;
  onSave: (editedImageUrl: string) => void;
  aspectRatio?: number;
}

export default function ImageEditor({ imageUrl, onSave, aspectRatio = 1 }: ImageEditorProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Mock image editing functions
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleSave = () => {
    // In a real app, process the image with the current transformations
    onSave(imageUrl);
  };

  const handleReset = () => {
    setScale(1);
    setRotation(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={[
            styles.preview,
            { aspectRatio },
            {
              transform: [
                { scale },
                { rotate: `${rotation}deg` }
              ]
            }
          ]}
          resizeMode="contain"
        />
      </View>

      <View style={styles.controls}>
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleZoomOut}
          >
            <ZoomOut size={24} color={Colors.neutrals[700]} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleZoomIn}
          >
            <ZoomIn size={24} color={Colors.neutrals[700]} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleRotate}
          >
            <RotateCcw size={24} color={Colors.neutrals[700]} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleReset}
          >
            <Crop size={24} color={Colors.neutrals[700]} />
          </TouchableOpacity>
        </View>

        <Button
          title="Save Changes"
          onPress={handleSave}
          style={styles.saveButton}
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  previewContainer: {
    backgroundColor: Colors.neutrals[100],
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: Layout.spacing.md,
  },
  preview: {
    width: '100%',
  },
  controls: {
    gap: Layout.spacing.md,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Layout.spacing.md,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutrals[200],
  },
  saveButton: {
    marginTop: Layout.spacing.sm,
  },
});