import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Grid2x2 as Grid } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface GridDividerProps {
  imageUrl: string;
  gridSize: 4 | 9 | 16 | 25 | 36;
  onGridImagePress?: (index: number) => void;
}

export default function GridDivider({ imageUrl, gridSize, onGridImagePress }: GridDividerProps) {
  const dimension = Math.sqrt(gridSize);
  const gridCells = Array(gridSize).fill(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Grid size={20} color={Colors.primary[500]} />
        <Text style={styles.headerText}>
          {dimension}×{dimension} Grid Preview
        </Text>
      </View>

      <View style={styles.originalPreview}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.originalImage}
          resizeMode="cover"
        />
        <View 
          style={[
            styles.gridOverlay,
            {
              display: 'grid',
              gridTemplateColumns: `repeat(${dimension}, 1fr)`,
            }
          ]}
        >
          {gridCells.map((_, index) => (
            <View key={index} style={styles.gridCell} />
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Individual Pieces</Text>
      
      <ScrollView 
        style={styles.piecesContainer}
        contentContainerStyle={styles.piecesContent}
      >
        <View style={styles.piecesGrid}>
          {gridCells.map((_, index) => (
            <View
              key={index}
              style={[
                styles.pieceContainer,
                { width: `${100 / dimension}%` }
              ]}
            >
              <Image
                source={{ uri: imageUrl }}
                style={styles.pieceImage}
                resizeMode="cover"
              />
              <Text style={styles.pieceNumber}>
                {index + 1}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.xs,
    marginBottom: Layout.spacing.md,
  },
  headerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutrals[800],
  },
  originalPreview: {
    position: 'relative',
    aspectRatio: 1,
    borderRadius: Layout.borderRadius.md,
    overflow: 'hidden',
    marginBottom: Layout.spacing.lg,
  },
  originalImage: {
    width: '100%',
    height: '100%',
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  gridCell: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutrals[900],
    marginBottom: Layout.spacing.md,
  },
  piecesContainer: {
    flex: 1,
  },
  piecesContent: {
    paddingBottom: Layout.spacing.lg,
  },
  piecesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pieceContainer: {
    aspectRatio: 1,
    padding: 4,
    position: 'relative',
  },
  pieceImage: {
    width: '100%',
    height: '100%',
    borderRadius: Layout.borderRadius.sm,
  },
  pieceNumber: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: Colors.white,
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.sm,
  },
});