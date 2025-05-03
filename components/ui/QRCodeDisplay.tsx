import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  logo?: string;
  title?: string;
}

export default function QRCodeDisplay({
  value,
  size = 200,
  logo,
  title,
}: QRCodeDisplayProps) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.qrContainer}>
        <QRCode
          value={value}
          size={size}
          color={Colors.neutrals[900]}
          backgroundColor={Colors.white}
          logo={{ uri: logo }}
          logoSize={size * 0.2}
          logoBackgroundColor={Colors.white}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutrals[800],
    marginBottom: Layout.spacing.sm,
  },
  qrContainer: {
    padding: Layout.spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});