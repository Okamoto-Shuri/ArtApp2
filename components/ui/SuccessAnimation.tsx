import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Check } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface SuccessAnimationProps {
  message?: string;
  onComplete?: () => void;
}

export default function SuccessAnimation({ 
  message = 'Success!',
  onComplete,
}: SuccessAnimationProps) {
  const scaleValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(0);

  useEffect(() => {
    const scaleAnimation = Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 12,
      bounciness: 8,
    });

    const opacityAnimation = Animated.timing(opacityValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    });

    Animated.parallel([scaleAnimation, opacityAnimation]).start(() => {
      if (onComplete) {
        setTimeout(onComplete, 1500);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: opacityValue,
            transform: [{ scale: scaleValue }],
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <Check size={48} color={Colors.white} strokeWidth={3} />
        </View>
        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 100,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.success[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  message: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: Colors.white,
    textAlign: 'center',
  },
});