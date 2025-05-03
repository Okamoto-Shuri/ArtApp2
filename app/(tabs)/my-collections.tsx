import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Medal, Scan } from 'lucide-react-native';
import { Project } from '@/types';
import Card from '@/components/ui/Card';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

export default function MyCollectionsScreen() {
  const router = useRouter();
  const [collections, setCollections] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'inProgress' | 'completed'>('inProgress');

  // Mock data for demonstration
  const mockCollections: Project[] = [
    {
      id: '1',
      owner_id: 'user1',
      title: 'Urban Art Hunt',
      description: 'Explore urban art installations across downtown.',
      image_url: 'https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg',
      grid_size: 9,
      public_status: 'public',
      start_date: '2025-01-01',
      end_date: '2025-12-31',
      created_at: '2024-12-01',
      updated_at: '2024-12-01',
      progress: {
        id: 'progress1',
        user_id: 'currentUser',
        project_id: '1',
        scanned_locations: [
          {
            location_id: 'loc1',
            grid_position_x: 0,
            grid_position_y: 0,
            scanned_at: '2025-01-15'
          },
          {
            location_id: 'loc2',
            grid_position_x: 1,
            grid_position_y: 0,
            scanned_at: '2025-01-16'
          }
        ],
        completion_status: false,
        nft_claimed: false,
        last_scanned_at: '2025-01-16',
        created_at: '2025-01-15',
        updated_at: '2025-01-16',
        collected_count: 2,
        total_count: 9,
        completion_percentage: 22
      }
    },
    {
      id: '2',
      owner_id: 'user2',
      title: 'Nature Gallery',
      description: 'A journey through natural landscapes.',
      image_url: 'https://images.pexels.com/photos/15286/pexels-photo.jpg',
      grid_size: 16,
      public_status: 'public',
      start_date: '2025-01-15',
      end_date: '2025-11-30',
      created_at: '2024-12-15',
      updated_at: '2024-12-15',
      progress: {
        id: 'progress2',
        user_id: 'currentUser',
        project_id: '2',
        scanned_locations: [
          {
            location_id: 'loc3',
            grid_position_x: 0,
            grid_position_y: 0,
            scanned_at: '2025-01-20'
          }
        ],
        completion_status: false,
        nft_claimed: false,
        last_scanned_at: '2025-01-20',
        created_at: '2025-01-20',
        updated_at: '2025-01-20',
        collected_count: 1,
        total_count: 16,
        completion_percentage: 6
      }
    },
    {
      id: '3',
      owner_id: 'user3',
      title: 'Museum Tour',
      description: 'An interactive tour of famous artworks.',
      image_url: 'https://images.pexels.com/photos/3004909/pexels-photo-3004909.jpeg',
      grid_size: 4,
      public_status: 'public',
      start_date: '2025-02-01',
      end_date: '2025-10-31',
      created_at: '2025-01-01',
      updated_at: '2025-01-01',
      progress: {
        id: 'progress3',
        user_id: 'currentUser',
        project_id: '3',
        scanned_locations: [
          { location_id: 'loc4', grid_position_x: 0, grid_position_y: 0, scanned_at: '2025-02-05' },
          { location_id: 'loc5', grid_position_x: 0, grid_position_y: 1, scanned_at: '2025-02-05' },
          { location_id: 'loc6', grid_position_x: 1, grid_position_y: 0, scanned_at: '2025-02-06' },
          { location_id: 'loc7', grid_position_x: 1, grid_position_y: 1, scanned_at: '2025-02-06' }
        ],
        completion_status: true,
        nft_claimed: true,
        last_scanned_at: '2025-02-06',
        created_at: '2025-02-05',
        updated_at: '2025-02-06',
        collected_count: 4,
        total_count: 4,
        completion_percentage: 100
      }
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setCollections(mockCollections);
      setLoading(false);
    }, 1000);
  }, []);

  // Navigate to project details
  const handleProjectPress = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  // Navigate to QR scanner
  const handleScanPress = () => {
    router.push('/qr-scanner');
  };

  // Filter collections based on active tab
  const filteredCollections = collections.filter(project => {
    if (activeTab === 'completed') {
      return project.progress?.completion_status;
    } else {
      return !project.progress?.completion_status;
    }
  });

  // Render collection item
  const renderCollectionItem = ({ item }: { item: Project }) => {
    const progress = item.progress || { 
      completion_percentage: 0,
      collected_count: 0,
      total_count: 0
    };
    
    return (
      <TouchableOpacity
        onPress={() => handleProjectPress(item.id)}
        activeOpacity={0.8}
      >
        <Card style={styles.collectionCard}>
          <View style={styles.collectionHeader}>
            <Image
              source={{ uri: item.image_url }}
              style={styles.collectionImage}
            />
            
            <View style={styles.collectionInfo}>
              <Text style={styles.collectionTitle}>{item.title}</Text>
              <Text style={styles.collectionDescription} numberOfLines={1}>
                {item.description}
              </Text>
              
              <View style={styles.progressRow}>
                <ProgressIndicator 
                  progress={progress.completion_percentage} 
                  size={32}
                  strokeWidth={4}
                />
                <Text style={styles.progressText}>
                  {progress.collected_count} / {progress.total_count} collected
                </Text>
              </View>
            </View>
          </View>
          
          {activeTab === 'completed' && progress.completion_status && (
            <View style={styles.completedBadge}>
              <Medal size={16} color={Colors.white} />
              <Text style={styles.completedText}>
                {progress.nft_claimed ? 'NFT Claimed' : 'Ready to Claim'}
              </Text>
            </View>
          )}
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Collections</Text>
        
        <TouchableOpacity 
          style={styles.scanButton}
          onPress={handleScanPress}
        >
          <Scan size={20} color={Colors.white} />
          <Text style={styles.scanButtonText}>Scan QR</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'inProgress' && styles.activeTab]}
          onPress={() => setActiveTab('inProgress')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'inProgress' && styles.activeTabText
            ]}
          >
            In Progress
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'completed' && styles.activeTabText
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Loading collections...</Text>
        </View>
      ) : filteredCollections.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {activeTab === 'inProgress'
              ? 'You have no collections in progress.'
              : 'You have no completed collections yet.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredCollections}
          renderItem={renderCollectionItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutrals[200],
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.neutrals[900],
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[500],
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    gap: Layout.spacing.xs,
  },
  scanButtonText: {
    color: Colors.white,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutrals[200],
  },
  tab: {
    paddingVertical: Layout.spacing.sm,
    marginRight: Layout.spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary[500],
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutrals[600],
  },
  activeTabText: {
    color: Colors.primary[500],
  },
  listContent: {
    padding: Layout.spacing.md,
  },
  collectionCard: {
    marginBottom: Layout.spacing.md,
  },
  collectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collectionImage: {
    width: 60,
    height: 60,
    borderRadius: Layout.borderRadius.sm,
  },
  collectionInfo: {
    flex: 1,
    marginLeft: Layout.spacing.md,
  },
  collectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutrals[900],
    marginBottom: 2,
  },
  collectionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[600],
    marginBottom: Layout.spacing.xs,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutrals[700],
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success[500],
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.sm,
    position: 'absolute',
    top: Layout.spacing.sm,
    right: Layout.spacing.sm,
    gap: 4,
  },
  completedText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutrals[600],
    textAlign: 'center',
  },
});