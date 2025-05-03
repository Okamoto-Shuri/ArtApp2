import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import Button from './Button';
import ImageUploader from './ImageUploader';
import MetadataEditor from './MetadataEditor';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface NFTFormProps {
  onSubmit: (data: NFTFormData) => void;
  loading?: boolean;
}

export interface NFTFormData {
  nftName: string;
  nftDescription: string;
  nftImageUrl: string;
  maxSupply: number;
  completionRequired: boolean;
  expirationDate: string;
  metadata: Record<string, any>;
}

export default function NFTForm({ onSubmit, loading = false }: NFTFormProps) {
  const [formData, setFormData] = useState<NFTFormData>({
    nftName: '',
    nftDescription: '',
    nftImageUrl: '',
    maxSupply: 100,
    completionRequired: true,
    expirationDate: '',
    metadata: {},
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const isFormValid = () => {
    return (
      formData.nftName.trim() !== '' &&
      formData.nftDescription.trim() !== '' &&
      formData.nftImageUrl !== ''
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NFT Details</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>NFT Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.nftName}
            onChangeText={(text) => setFormData({ ...formData, nftName: text })}
            placeholder="Enter NFT name"
            placeholderTextColor={Colors.neutrals[400]}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.nftDescription}
            onChangeText={(text) => setFormData({ ...formData, nftDescription: text })}
            placeholder="Describe your NFT"
            placeholderTextColor={Colors.neutrals[400]}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>NFT Image *</Text>
          <ImageUploader
            value={formData.nftImageUrl}
            onImageSelect={(url) => setFormData({ ...formData, nftImageUrl: url })}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Distribution Settings</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Maximum Supply</Text>
          <TextInput
            style={styles.input}
            value={String(formData.maxSupply)}
            onChangeText={(text) => setFormData({ ...formData, maxSupply: parseInt(text) || 0 })}
            placeholder="Enter maximum supply"
            placeholderTextColor={Colors.neutrals[400]}
            keyboardType="numeric"
          />
          <Text style={styles.hint}>
            Set to 0 for unlimited supply
          </Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Expiration Date</Text>
          <TextInput
            style={styles.input}
            value={formData.expirationDate}
            onChangeText={(text) => setFormData({ ...formData, expirationDate: text })}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={Colors.neutrals[400]}
          />
          <Text style={styles.hint}>
            Leave blank for no expiration
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Metadata</Text>
        <MetadataEditor
          value={formData.metadata}
          onChange={(metadata) => setFormData({ ...formData, metadata })}
        />
      </View>

      <Button
        title="Save NFT Settings"
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
  hint: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutrals[500],
    marginTop: Layout.spacing.xs,
  },
  submitButton: {
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.xl,
  },
});