import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Plus, Trash2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface MetadataEditorProps {
  value: Record<string, any>;
  onChange: (metadata: Record<string, any>) => void;
}

export default function MetadataEditor({ value, onChange }: MetadataEditorProps) {
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleAddAttribute = () => {
    if (newKey.trim() && newValue.trim()) {
      onChange({
        ...value,
        [newKey.trim()]: newValue.trim(),
      });
      setNewKey('');
      setNewValue('');
    }
  };

  const handleRemoveAttribute = (key: string) => {
    const newMetadata = { ...value };
    delete newMetadata[key];
    onChange(newMetadata);
  };

  return (
    <View style={styles.container}>
      <View style={styles.addAttributeContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.keyInput]}
            value={newKey}
            onChangeText={setNewKey}
            placeholder="Attribute name"
            placeholderTextColor={Colors.neutrals[400]}
          />
          <TextInput
            style={[styles.input, styles.valueInput]}
            value={newValue}
            onChangeText={setNewValue}
            placeholder="Value"
            placeholderTextColor={Colors.neutrals[400]}
          />
          <TouchableOpacity
            style={[
              styles.addButton,
              (!newKey.trim() || !newValue.trim()) && styles.addButtonDisabled,
            ]}
            onPress={handleAddAttribute}
            disabled={!newKey.trim() || !newValue.trim()}
          >
            <Plus size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.attributesList}>
        {Object.entries(value).map(([key, val]) => (
          <View key={key} style={styles.attributeItem}>
            <View style={styles.attributeContent}>
              <Text style={styles.attributeKey}>{key}</Text>
              <Text style={styles.attributeValue}>{String(val)}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveAttribute(key)}
            >
              <Trash2 size={16} color={Colors.error[500]} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Text style={styles.hint}>
        Add custom attributes to your NFT metadata
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addAttributeContainer: {
    marginBottom: Layout.spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.neutrals[300],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.sm,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[900],
  },
  keyInput: {
    flex: 2,
  },
  valueInput: {
    flex: 3,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: Layout.borderRadius.sm,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: Colors.neutrals[300],
  },
  attributesList: {
    gap: Layout.spacing.sm,
  },
  attributeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutrals[100],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.sm,
  },
  attributeContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  attributeKey: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutrals[700],
    flex: 2,
  },
  attributeValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[900],
    flex: 3,
  },
  removeButton: {
    padding: Layout.spacing.xs,
  },
  hint: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutrals[500],
    marginTop: Layout.spacing.md,
  },
});