import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
  bordered?: boolean;
}

export default function Card({ 
  children, 
  style, 
  elevated = true, 
  bordered = false 
}: CardProps) {
  return (
    <View 
      style={[
        styles.card, 
        elevated && styles.elevated, 
        bordered && styles.bordered,
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    overflow: 'hidden',
  },
  elevated: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bordered: {
    borderWidth: 1,
    borderColor: Colors.neutrals[200],
  },
});