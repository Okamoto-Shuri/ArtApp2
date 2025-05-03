import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useLINE } from '@/hooks/useLINE';

export default function LoginScreen() {
  const router = useRouter();
  const { handleLINELogin, isLoading, error } = useLINE();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/2747448/pexels-photo-2747448.jpeg' }}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Art QR Collector</Text>
        <Text style={styles.subtitle}>
          Discover art installations around you, collect pieces, and earn NFTs
        </Text>
        
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <Button
          title="Login with LINE"
          onPress={handleLINELogin}
          loading={isLoading}
          disabled={isLoading}
          style={styles.loginButton}
          size="lg"
          fullWidth
        />
        
        <Text style={styles.disclaimer}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Art QR Collector • v1.0.0
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: Layout.spacing.lg,
    borderRadius: 75,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.primary[700],
    marginBottom: Layout.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutrals[700],
    marginBottom: Layout.spacing.xl,
    textAlign: 'center',
    lineHeight: 24,
  },
  errorText: {
    color: Colors.error[500],
    marginBottom: Layout.spacing.md,
    textAlign: 'center',
  },
  loginButton: {
    marginBottom: Layout.spacing.lg,
  },
  disclaimer: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutrals[500],
    textAlign: 'center',
    marginTop: Layout.spacing.md,
  },
  footer: {
    padding: Layout.spacing.md,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutrals[500],
  },
});