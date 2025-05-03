import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Colors from '@/constants/Colors';

interface ProgressIndicatorProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  showText?: boolean;
  textSize?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function ProgressIndicator({
  progress,
  size = 60,
  strokeWidth = 6,
  showText = true,
  textSize = 14,
  primaryColor = Colors.primary[500],
  secondaryColor = Colors.neutrals[200],
}: ProgressIndicatorProps) {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(0, progress), 100);
  
  // Calculate radius and center point
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  
  // Calculate stroke dashoffset based on progress
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={secondaryColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90, ${center}, ${center})`}
        />
      </Svg>
      
      {showText && (
        <View style={styles.textContainer}>
          <Text style={[styles.text, { fontSize: textSize }]}>
            {Math.round(normalizedProgress)}%
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    fontWeight: '600',
    color: Colors.neutrals[800],
  },
});