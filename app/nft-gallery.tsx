import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Filter } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface NFT {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  projectName: string;
  collectionDate: string;
  tokenId: string;
}

export default function NFTGalleryScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<'all' | 'recent' | 'projects'>('all');
  
  // Mock NFT data
  const mockNFTs: NFT[] = [
    {
      id: '1',
      name: 'Urban Art Collection #1',
      description: 'Completed the Downtown Art Trail',
      imageUrl: 'https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg',
      projectName: 'Urban Art Hunt',
      collectionDate: '2025-01-20',
      tokenId: '1234',
    },
    {
      id: '2',
      name: 'Nature Gallery Collection',
      description: 'Discovered all hidden natural wonders',
      imageUrl: 'https://images.pexels.com/photos/15286/pexels-photo.jpg',
      projectName: 'Nature Gallery',
      collectionDate: '2025-02-15',
      tokenId: '1235',
    },
    {
      id: '3',
      name: 'Museum Tour Completion',
      description: 'Explored all museum exhibits',
      imageUrl: 'https://images.pexels.com/photos/3004909/pexels-photo-3004909.jpeg',
      projectName: 'Museum Tour',
      collectionDate: '2025-03-01',
      tokenId: '1236',
    },
  ];

  const renderNFTCard = ({ item }: { item: NFT }) => (
    <Card style={styles.nftCard}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.nftImage}
        resizeMode="cover"
      />
      
      <View style={styles.nftInfo}>
        <Text style={styles.nftName}>{item.name}</Text>
        <Text style={styles.nftDescription}>{item.description}</Text>
        
        <View style={styles.nftMetadata}>
          <View style={styles.metadataItem}>
            <Text style={styles.metadataLabel}>Project</Text>
            <Text style={styles.metadataValue}>{item.projectName}</Text>
          </View>
          
          <View style={styles.metadataItem}>
            <Text style={styles.metadataLabel}>Collected</Text>
            <Text style={styles.metadataValue}>
              {new Date(item.collectionDate).toLocaleDateString()}
            </Text>
          </View>
          
          <View style={styles.metadataItem}>
            <Text style={styles.metadataLabel}>Token ID</Text>
            <Text style={styles.metadataValue}>#{item.tokenId}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={Colors.neutrals[800]} />
        </TouchableOpacity>
        
        <Text style={styles.title}>NFT Gallery</Text>
        
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={24} color={Colors.neutrals[800]} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.filterTabs}>
        {(['all', 'recent', 'projects'] as const).map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              activeFilter === filter && styles.activeFilterTab,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === filter && styles.activeFilterTabText,
              ]}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <FlatList
        data={mockNFTs}
        renderItem={renderNFTCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.nftList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutrals[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutrals[200],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutrals[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.neutrals[900],
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutrals[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTabs: {
    flexDirection: 'row',
    padding: Layout.spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutrals[200],
  },
  filterTab: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    marginRight: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.pill,
    backgroundColor: Colors.neutrals[100],
  },
  activeFilterTab: {
    backgroundColor: Colors.primary[500],
  },
  filterTabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutrals[700],
  },
  activeFilterTabText: {
    color: Colors.white,
  },
  nftList: {
    padding: Layout.spacing.md,
  },
  nftCard: {
    marginBottom: Layout.spacing.md,
  },
  nftImage: {
    width: '100%',
    height: 200,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  nftInfo: {
    gap: Layout.spacing.sm,
  },
  nftName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.neutrals[900],
  },
  nftDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[700],
    marginBottom: Layout.spacing.xs,
  },
  nftMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.neutrals[100],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
  },
  metadataItem: {
    alignItems: 'center',
  },
  metadataLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutrals[600],
    marginBottom: 2,
  },
  metadataValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutrals[800],
  },
});