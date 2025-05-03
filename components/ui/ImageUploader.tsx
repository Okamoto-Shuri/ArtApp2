import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Upload, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string) => void;
  value?: string;
  aspectRatio?: number;
}

export default function ImageUploader({
  onImageSelect,
  value,
  aspectRatio = 1,
}: ImageUploaderProps) {
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = () => {
    // Mock image selection for demo
    const mockImageUrl = 'https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg';
    onImageSelect(mockImageUrl);
    setError(null);
  };

  const handleRemoveImage = () => {
    onImageSelect('');
  };

  return (
    <View style={styles.container}>
      {value ? (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: value }}
            style={[styles.preview, { aspectRatio }]}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleRemoveImage}
          >
            <X size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.uploadButton, { aspectRatio }]}
          onPress={handleImageSelect}
        >
          <Upload size={32} color={Colors.neutrals[400]} />
          <Text style={styles.uploadText}>Click to upload image</Text>
          <Text style={styles.uploadSubtext}>
            {Platform.OS === 'web' ? 'or drag and drop' : 'from your device'}
          </Text>
          <Text style={styles.uploadHint}>
            PNG, JPG up to 10MB
          </Text>
        </TouchableOpacity>
      )}

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  uploadButton: {
    backgroundColor: Colors.neutrals[100],
    borderWidth: 2,
    borderColor: Colors.neutrals[300],
    borderStyle: 'dashed',
    borderRadius: Layout.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  uploadText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutrals[700],
    marginTop: Layout.spacing.md,
  },
  uploadSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[500],
    marginTop: Layout.spacing.xs,
  },
  uploadHint: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutrals[400],
    marginTop: Layout.spacing.sm,
  },
  previewContainer: {
    position: 'relative',
    width: '100%',
  },
  preview: {
    width: '100%',
    borderRadius: Layout.borderRadius.lg,
  },
  removeButton: {
    position: 'absolute',
    top: Layout.spacing.sm,
    right: Layout.spacing.sm,
    backgroundColor: Colors.error[500],
    borderRadius: Layout.borderRadius.full,
    padding: Layout.spacing.sm,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.error[500],
    marginTop: Layout.spacing.sm,
  },
});