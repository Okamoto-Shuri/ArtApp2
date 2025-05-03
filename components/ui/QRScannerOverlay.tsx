import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import Colors from '@/constants/Colors';

interface QRScannerOverlayProps {
  width?: number;
  height?: number;
  frameSize?: number;
  borderColor?: string;
  showFrame?: boolean;
  showScanLine?: boolean;
  scanLineColor?: string;
}

export default function QRScannerOverlay({
  width = Dimensions.get('window').width,
  height = Dimensions.get('window').height,
  frameSize = 250,
  borderColor = Colors.primary[500],
  showFrame = true,
  showScanLine = true,
  scanLineColor = Colors.primary[500],
}: QRScannerOverlayProps) {
  const centerX = width / 2;
  const centerY = height / 2;
  const frameX = centerX - frameSize / 2;
  const frameY = centerY - frameSize / 2;
  const cornerSize = 25;

  return (
    <View style={styles.container}>
      <Svg height={height} width={width}>
        <Defs>
          <LinearGradient id="scanLineGradient" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={`${scanLineColor}00`} />
            <Stop offset="0.5" stopColor={scanLineColor} />
            <Stop offset="1" stopColor={`${scanLineColor}00`} />
          </LinearGradient>
        </Defs>
        
        {/* Semi-transparent overlay */}
        <Rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="rgba(0, 0, 0, 0.5)"
          mask="url(#mask)"
        />
        
        {/* Cutout for scanner */}
        <Rect
          x={frameX}
          y={frameY}
          width={frameSize}
          height={frameSize}
          fill="transparent"
          stroke="none"
        />
        
        {/* Top-left corner */}
        {showFrame && (
          <>
            <Path
              d={`M ${frameX} ${frameY + cornerSize} L ${frameX} ${frameY} L ${
                frameX + cornerSize
              } ${frameY}`}
              stroke={borderColor}
              strokeWidth={4}
              fill="transparent"
            />
            
            {/* Top-right corner */}
            <Path
              d={`M ${frameX + frameSize - cornerSize} ${frameY} L ${
                frameX + frameSize
              } ${frameY} L ${frameX + frameSize} ${frameY + cornerSize}`}
              stroke={borderColor}
              strokeWidth={4}
              fill="transparent"
            />
            
            {/* Bottom-right corner */}
            <Path
              d={`M ${frameX + frameSize} ${frameY + frameSize - cornerSize} L ${
                frameX + frameSize
              } ${frameY + frameSize} L ${
                frameX + frameSize - cornerSize
              } ${frameY + frameSize}`}
              stroke={borderColor}
              strokeWidth={4}
              fill="transparent"
            />
            
            {/* Bottom-left corner */}
            <Path
              d={`M ${frameX + cornerSize} ${frameY + frameSize} L ${frameX} ${
                frameY + frameSize
              } L ${frameX} ${frameY + frameSize - cornerSize}`}
              stroke={borderColor}
              strokeWidth={4}
              fill="transparent"
            />
          </>
        )}
        
        {/* Scan line */}
        {showScanLine && (
          <Rect
            x={frameX}
            y={centerY - 1}
            width={frameSize}
            height={2}
            fill="url(#scanLineGradient)"
          />
        )}
      </Svg>
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
    zIndex: 100,
  },
});