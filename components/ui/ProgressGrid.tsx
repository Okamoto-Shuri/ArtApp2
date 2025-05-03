import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ScannedLocation } from '@/types';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface ProgressGridProps {
  gridSize: 4 | 9 | 16 | 25 | 36;
  collectedLocations: ScannedLocation[];
  imageUrls: string[];
  placeholderImageUrl?: string;
  onCellPress?: (x: number, y: number) => void;
}

export default function ProgressGrid({
  gridSize,
  collectedLocations,
  imageUrls,
  placeholderImageUrl = 'https://images.pexels.com/photos/3075535/pexels-photo-3075535.jpeg',
  onCellPress,
}: ProgressGridProps) {
  // Calculate grid dimensions
  const dimension = Math.sqrt(gridSize);
  
  // Create a 2D array representing the grid
  const grid: boolean[][] = Array(dimension)
    .fill(null)
    .map(() => Array(dimension).fill(false));
  
  // Mark collected locations in the grid
  collectedLocations.forEach((location) => {
    const { grid_position_x, grid_position_y } = location;
    if (grid_position_x < dimension && grid_position_y < dimension) {
      grid[grid_position_y][grid_position_x] = true;
    }
  });
  
  // Render grid
  const renderGrid = () => {
    const cells = [];
    
    for (let y = 0; y < dimension; y++) {
      for (let x = 0; x < dimension; x++) {
        const isCollected = grid[y][x];
        const cellIndex = y * dimension + x;
        const imageUrl = isCollected && imageUrls.length > cellIndex 
          ? imageUrls[cellIndex] 
          : placeholderImageUrl;
          
        cells.push(
          <TouchableOpacity
            key={`cell-${x}-${y}`}
            style={styles.cell}
            onPress={() => onCellPress && onCellPress(x, y)}
            disabled={!onCellPress}
          >
            <Image
              source={{ uri: imageUrl }}
              style={[
                styles.cellImage,
                !isCollected && styles.uncollectedImage,
              ]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      }
    }
    
    return cells;
  };

  return (
    <View style={[styles.container, { width: '100%' }]}>
      <View 
        style={[
          styles.grid, 
          { 
            gridTemplateColumns: `repeat(${dimension}, 1fr)`,
            gap: Layout.spacing.xs,
          }
        ]}
      >
        {renderGrid()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.spacing.sm,
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    flex: 1,
    minWidth: `${100 / 6}%`, // Support up to 6x6 grid
    aspectRatio: 1,
    borderRadius: Layout.borderRadius.xs,
    overflow: 'hidden',
    margin: 2,
  },
  cellImage: {
    width: '100%',
    height: '100%',
  },
  uncollectedImage: {
    opacity: 0.3,
    filter: 'blur(3px)',
  },
});