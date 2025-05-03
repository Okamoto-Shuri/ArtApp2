import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Scan, Filter } from 'lucide-react-native';
import { Project } from '@/types';
import ProjectCard from '@/components/ui/ProjectCard';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import api from '@/api/client';

export default function ExploreScreen() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Mock projects for demonstration
  const mockProjects: Project[] = [
    {
      id: '1',
      owner_id: 'user1',
      title: 'Urban Art Hunt',
      description: 'Explore urban art installations across downtown. Collect all pieces to receive an exclusive NFT celebrating city culture.',
      image_url: 'https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg',
      grid_size: 9,
      public_status: 'public',
      start_date: '2025-01-01',
      end_date: '2025-12-31',
      created_at: '2024-12-01',
      updated_at: '2024-12-01',
      like_count: 256,
      comment_count: 42,
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
      description: 'A journey through natural landscapes. Each QR code reveals a piece of the breathtaking panorama of our planet.',
      image_url: 'https://images.pexels.com/photos/15286/pexels-photo.jpg',
      grid_size: 16,
      public_status: 'public',
      start_date: '2025-01-15',
      end_date: '2025-11-30',
      created_at: '2024-12-15',
      updated_at: '2024-12-15',
      like_count: 189,
      comment_count: 31,
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
      description: 'An interactive tour of famous artworks. Scan QR codes at each exhibit to learn more and collect digital souvenirs.',
      image_url: 'https://images.pexels.com/photos/3004909/pexels-photo-3004909.jpeg',
      grid_size: 4,
      public_status: 'public',
      start_date: '2025-02-01',
      end_date: '2025-10-31',
      created_at: '2025-01-01',
      updated_at: '2025-01-01',
      like_count: 128,
      comment_count: 19
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // In real implementation, fetch from API
        // const response = await api.getProjects();
        // setProjects(response.data);
        
        // Using mock data for demo
        setTimeout(() => {
          setProjects(mockProjects);
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter options
  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'popular', label: 'Popular' },
    { id: 'new', label: 'New' },
  ];

  // Navigate to QR scanner
  const handleScanPress = () => {
    router.push('/qr-scanner');
  };

  // Filter projects (in real app, this would call API with filter params)
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    // In real implementation, fetch filtered projects
  };

  // Render content
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary[500]} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Projects</Text>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={Colors.neutrals[500]} />
            <Text style={styles.searchPlaceholder}>Search projects...</Text>
          </View>
          
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={Colors.neutrals[700]} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.scanButton}
            onPress={handleScanPress}
          >
            <Scan size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.filterTabsContainer}>
          <FlatList
            data={filterOptions}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.filterTab,
                  activeFilter === item.id && styles.activeFilterTab,
                ]}
                onPress={() => handleFilterChange(item.id)}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    activeFilter === item.id && styles.activeFilterTabText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button
            title="Try Again"
            onPress={() => setLoading(true)}
            variant="primary"
          />
        </View>
      ) : (
        <FlatList
          data={projects}
          renderItem={({ item }) => <ProjectCard project={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.projectsList}
          showsVerticalScrollIndicator={false}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: Colors.white,
    paddingTop: 60,
    paddingBottom: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutrals[200],
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.neutrals[900],
    marginBottom: Layout.spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
    gap: Layout.spacing.sm,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutrals[100],
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
  },
  searchPlaceholder: {
    marginLeft: Layout.spacing.sm,
    color: Colors.neutrals[500],
    fontFamily: 'Inter-Regular',
  },
  filterButton: {
    padding: Layout.spacing.sm,
    backgroundColor: Colors.neutrals[100],
    borderRadius: Layout.borderRadius.md,
  },
  scanButton: {
    padding: Layout.spacing.sm,
    backgroundColor: Colors.primary[500],
    borderRadius: Layout.borderRadius.md,
  },
  filterTabsContainer: {
    marginTop: Layout.spacing.sm,
  },
  filterTab: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    marginRight: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.pill,
    backgroundColor: Colors.neutrals[100],
  },
  activeFilterTab: {
    backgroundColor: Colors.primary[500],
  },
  filterTabText: {
    fontFamily: 'Inter-Medium',
    color: Colors.neutrals[700],
  },
  activeFilterTabText: {
    color: Colors.white,
  },
  projectsList: {
    padding: Layout.spacing.md,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.error[500],
    textAlign: 'center',
    marginBottom: Layout.spacing.md,
  },
});