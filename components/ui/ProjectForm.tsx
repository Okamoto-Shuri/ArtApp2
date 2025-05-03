import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Calendar } from 'lucide-react-native';
import Button from './Button';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  loading?: boolean;
}

export interface ProjectFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  gridSize: number;
  publicStatus: 'public' | 'private' | 'draft';
}

export default function ProjectForm({ onSubmit, loading = false }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    gridSize: 9,
    publicStatus: 'draft',
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const isFormValid = () => {
    return (
      formData.title.trim() !== '' &&
      formData.description.trim() !== '' &&
      formData.startDate !== '' &&
      formData.endDate !== ''
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Project Title *</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
          placeholder="Enter project title"
          placeholderTextColor={Colors.neutrals[400]}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          placeholder="Describe your project"
          placeholderTextColor={Colors.neutrals[400]}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.dateContainer}>
        <View style={styles.dateField}>
          <Text style={styles.label}>Start Date *</Text>
          <View style={styles.dateInputContainer}>
            <Calendar size={20} color={Colors.neutrals[400]} />
            <TextInput
              style={styles.dateInput}
              value={formData.startDate}
              onChangeText={(text) => setFormData({ ...formData, startDate: text })}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={Colors.neutrals[400]}
            />
          </View>
        </View>

        <View style={styles.dateField}>
          <Text style={styles.label}>End Date *</Text>
          <View style={styles.dateInputContainer}>
            <Calendar size={20} color={Colors.neutrals[400]} />
            <TextInput
              style={styles.dateInput}
              value={formData.endDate}
              onChangeText={(text) => setFormData({ ...formData, endDate: text })}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={Colors.neutrals[400]}
            />
          </View>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Grid Size</Text>
        <View style={styles.gridSizeContainer}>
          {[4, 9, 16, 25, 36].map((size) => (
            <Button
              key={size}
              title={`${Math.sqrt(size)}×${Math.sqrt(size)}`}
              onPress={() => setFormData({ ...formData, gridSize: size })}
              variant={formData.gridSize === size ? 'primary' : 'outline'}
              style={styles.gridSizeButton}
            />
          ))}
        </View>
      </View>

      <Button
        title="Continue"
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
  dateContainer: {
    flexDirection: 'row',
    gap: Layout.spacing.md,
    marginBottom: Layout.spacing.lg,
  },
  dateField: {
    flex: 1,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.neutrals[300],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
  },
  dateInput: {
    flex: 1,
    marginLeft: Layout.spacing.sm,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutrals[900],
  },
  gridSizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.sm,
  },
  gridSizeButton: {
    flex: 1,
    minWidth: '30%',
  },
  submitButton: {
    marginTop: Layout.spacing.md,
  },
});