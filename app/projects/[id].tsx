import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Heart, MessageCircle, Map, QrCode, Share2 } from 'lucide-react-native';
import { Project, Location } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressGrid from '@/components/ui/ProgressGrid';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'details' | 'map' | 'comments'>('details');
  const [isLiked, setIsLiked] = useState(false);
  
  // Mock project data
  const mockProject: Project = {
    id: '1',
    owner_id: 'user1',
    title: 'Urban Art Hunt',
    description: 'Explore urban art installations across downtown. This project takes you on a journey through the city's most vibrant street art. Each location reveals a piece of a larger artwork, and when completed, you'll receive an exclusive NFT celebrating city culture.\n\nThe installations are accessible during regular hours and placed in public areas. Wear comfortable shoes as you'll be walking to different locations throughout the downtown area.',
    image_url: 'https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg',
    grid_size: 9,
    public_status: 'public',
    start_date: '2025-01-01',
    end_date: '2025-12-31',
    created_at: '2024-12-01',
    updated_at: '2024-12-01',
    like_count: 256,
    comment_count: 42,
    is_liked: false,
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
        },
        {
          location_id: 'loc3',
          grid_position_x: 2,
          grid_position_y: 0,
          scanned_at: '2025-01-17'
        }
      ],
      completion_status: false,
      nft_claimed: false,
      last_scanned_at: '2025-01-17',
      created_at: '2025-01-15',
      updated_at: '2025-01-17',
      collected_count: 3,
      total_count: 9,
      completion_percentage: 33
    }
  };
  
  // Mock locations
  const mockLocations: Location[] = [
    {
      id: 'loc1',
      project_id: '1',
      title: 'Downtown Plaza',
      description: 'Near the central fountain',
      address: '123 Main St, Anytown',
      latitude: 37.7749,
      longitude: -122.4194,
      grid_position_x: 0,
      grid_position_y: 0,
      qr_code_data: 'qr_data_1',
      created_at: '2024-12-01',
      updated_at: '2024-12-01'
    },
    {
      id: 'loc2',
      project_id: '1',
      title: 'Art Gallery',
      description: 'Entrance to the Modern Art Exhibit',
      address: '456 Gallery Ave, Anytown',
      latitude: 37.7748,
      longitude: -122.4198,
      grid_position_x: 1,
      grid_position_y: 0,
      qr_code_data: 'qr_data_2',
      created_at: '2024-12-01',
      updated_at: '2024-12-01'
    },
    {
      id: 'loc3',
      project_id: '1',
      title: 'City Park',
      description: 'Near the east entrance',
      address: '789 Park Rd, Anytown',
      latitude: 37.7751,
      longitude: -122.4190,
      grid_position_x: 2,
      grid_position_y: 0,
      qr_code_data: 'qr_data_3',
      created_at: '2024-12-01',
      updated_at: '2024-12-01'
    }
  ];
  
  // Mock comments
  const mockComments = [
    {
      id: 'comment1',
      user_id: 'user2',
      content: 'This was such a fun experience! The artwork is amazing.',
      created_at: '2025-01-20T14:25:00Z',
      user: {
        display_name: 'Jamie Smith',
        profile_image_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
      }
    },
    {
      id: 'comment2',
      user_id: 'user3',
      content: 'I found all but one location. The clues were really helpful!',
      created_at: '2025-01-18T09:12:00Z',
      user: {
        display_name: 'Taylor Johnson',
        profile_image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
      }
    }
  ];
  
  // Handle going back
  const handleBack = () => {
    router.back();
  };
  
  // Handle like
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  
  // Handle scan
  const handleScan = () => {
    router.push('/qr-scanner');
  };
  
  // Handle claim NFT
  const handleClaimNFT = () => {
    // Show modal or navigate to claim page
    console.log('Claim NFT');
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Generate mock image URLs for grid
  const generateGridImageUrls = () => {
    const baseUrl = 'https://images.pexels.com/photos/';
    const imageIds = [
      '2119706', '1616403', '3004909', '1366957', 
      '1366919', '1420702', '1420709', '1644794', '1828875'
    ];
    return imageIds.map(id => `${baseUrl}${id}/pexels-photo-${id}.jpeg`);
  };
  
  // Render project details tab
  const renderDetailsTab = () => (
    <View style={styles.tabContent}>
      <Card style={styles.infoCard}>
        <Text style={styles.infoLabel}>Project Period</Text>
        <Text style={styles.infoValue}>
          {formatDate(mockProject.start_date)} - {formatDate(mockProject.end_date)}
        </Text>
        
        <Text style={styles.infoLabel}>Description</Text>
        <Text style={styles.description}>{mockProject.description}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Your Progress</Text>
            <View style={styles.progressStats}>
              <ProgressIndicator
                progress={mockProject.progress?.completion_percentage || 0}
                size={36}
                strokeWidth={4}
              />
              <Text style={styles.progressPercentage}>
                {mockProject.progress?.completion_percentage || 0}%
              </Text>
            </View>
          </View>
          
          <Text style={styles.progressSubtitle}>
            {mockProject.progress?.collected_count || 0} of {mockProject.progress?.total_count || 0} found
          </Text>
          
          <ProgressGrid
            gridSize={mockProject.grid_size}
            collectedLocations={mockProject.progress?.scanned_locations || []}
            imageUrls={generateGridImageUrls()}
          />
          
          {mockProject.progress?.completion_status ? (
            <Button
              title="Claim NFT"
              onPress={handleClaimNFT}
              fullWidth
              style={styles.actionButton}
            />
          ) : (
            <Button
              title="Scan QR Code"
              onPress={handleScan}
              fullWidth
              style={styles.actionButton}
            />
          )}
        </View>
      </Card>
    </View>
  );
  
  // Render map tab
  const renderMapTab = () => (
    <View style={styles.tabContent}>
      <Card style={styles.mapCard}>
        <View style={styles.mapPlaceholder}>
          <Map size={48} color={Colors.neutrals[400]} />
          <Text style={styles.mapPlaceholderText}>
            Map view showing {mockLocations.length} locations
          </Text>
        </View>
        
        <Text style={styles.locationsTitle}>Locations</Text>
        
        {mockLocations.map((location, index) => (
          <View key={location.id} style={styles.locationItem}>
            <View style={styles.locationIndex}>
              <Text style={styles.locationIndexText}>{index + 1}</Text>
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{location.title}</Text>
              <Text style={styles.locationAddress}>{location.address}</Text>
              <Text style={styles.locationDescription}>{location.description}</Text>
            </View>
            <View style={styles.locationStatus}>
              <View style={[
                styles.statusIndicator, 
                mockProject.progress?.scanned_locations.some(
                  loc => loc.grid_position_x === location.grid_position_x && 
                         loc.grid_position_y === location.grid_position_y
                ) ? styles.foundIndicator : styles.notFoundIndicator
              ]} />
            </View>
          </View>
        ))}
        
        <Button
          title="Scan QR Code"
          onPress={handleScan}
          fullWidth
          style={styles.actionButton}
        />
      </Card>
    </View>
  );
  
  // Render comments tab
  const renderCommentsTab = () => (
    <View style={styles.tabContent}>
      <Card style={styles.commentsCard}>
        {mockComments.map(comment => (
          <View key={comment.id} style={styles.commentItem}>
            <Image
              source={{ uri: comment.user.profile_image_url }}
              style={styles.commentAvatar}
            />
            <View style={styles.commentContent}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentAuthor}>{comment.user.display_name}</Text>
                <Text style={styles.commentDate}>
                  {new Date(comment.created_at).toLocaleDateString()}
                </Text>
              </View>
              <Text style={styles.commentText}>{comment.content}</Text>
            </View>
          </View>
        ))}
        
        <View style={styles.addCommentContainer}>
          <Text style={styles.addCommentLabel}>Add a comment</Text>
          <TouchableOpacity style={styles.commentInputPlaceholder}>
            <Text style={styles.commentInputText}>Write your comment...</Text>
          </TouchableOpacity>
          <Button
            title="Post Comment"
            variant="secondary"
            fullWidth
          />
        </View>
      </Card>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerImageContainer}>
        <Image 
          source={{ uri: mockProject.image_url }}
          style={styles.headerImage}
        />
        <View style={styles.headerOverlay} />
        
        <View style={styles.headerControls}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
          >
            <ChevronLeft size={24} color={Colors.white} />
          </TouchableOpacity>
          
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => {}}
            >
              <Share2 size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{mockProject.title}</Text>
          
          <View style={styles.statsContainer}>
            <TouchableOpacity
              style={styles.statItem}
              onPress={handleLike}
            >
              <Heart
                size={18}
                color={isLiked ? Colors.error[500] : Colors.neutrals[600]}
                fill={isLiked ? Colors.error[500] : 'transparent'}
              />
              <Text style={styles.statValue}>
                {mockProject.like_count || 0}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => setActiveTab('comments')}
            >
              <MessageCircle size={18} color={Colors.neutrals[600]} />
              <Text style={styles.statValue}>
                {mockProject.comment_count || 0}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => setActiveTab('map')}
            >
              <Map size={18} color={Colors.neutrals[600]} />
              <Text style={styles.statValue}>
                {mockLocations.length}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.scanButton}
              onPress={handleScan}
            >
              <QrCode size={16} color={Colors.white} />
              <Text style={styles.scanButtonText}>Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'details' && styles.activeTab]}
            onPress={() => setActiveTab('details')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'details' && styles.activeTabText
            ]}>
              Details
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'map' && styles.activeTab]}
            onPress={() => setActiveTab('map')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'map' && styles.activeTabText
            ]}>
              Map
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'comments' && styles.activeTab]}
            onPress={() => setActiveTab('comments')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'comments' && styles.activeTabText
            ]}>
              Comments
            </Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === 'details' && renderDetailsTab()}
        {activeTab === 'map' && renderMapTab()}
        {activeTab === 'comments' && renderCommentsTab()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutrals[50],
  },
  headerImageContainer: {
    position: 'relative',
    height: 250,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerControls: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Layout.spacing.xs,
  },
  contentContainer: {
    padding: Layout.spacing.md,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.neutrals[50],
  },
  titleContainer: {
    marginBottom: Layout.spacing.md,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.neutrals[900],
    marginBottom: Layout.spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  statValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.neutrals[700],
    marginLeft: 4,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[500],
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.sm,
    marginLeft: 'auto',
  },
  scanButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.white,
    marginLeft: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutrals[200],
    marginBottom: Layout.spacing.md,
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
  tabContent: {
    marginBottom: Layout.spacing.xl,
  },
  infoCard: {
    marginBottom: Layout.spacing.md,
  },
  infoLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.neutrals[700],
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutrals[900],
    marginBottom: Layout.spacing.md,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutrals[800],
    lineHeight: 24,
    marginBottom: Layout.spacing.lg,
  },
  progressContainer: {
    marginTop: Layout.spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutrals[900],
  },
  progressStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressPercentage: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutrals[800],
    marginLeft: Layout.spacing.xs,
  },
  progressSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[600],
    marginBottom: Layout.spacing.md,
  },
  mapCard: {
    marginBottom: Layout.spacing.md,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: Colors.neutrals[100],
    borderRadius: Layout.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  mapPlaceholderText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutrals[600],
    marginTop: Layout.spacing.sm,
  },
  locationsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutrals[900],
    marginBottom: Layout.spacing.md,
  },
  locationItem: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.md,
    alignItems: 'flex-start',
  },
  locationIndex: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.sm,
  },
  locationIndexText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.primary[700],
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutrals[900],
  },
  locationAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[700],
  },
  locationDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[600],
    marginTop: 2,
  },
  locationStatus: {
    marginLeft: Layout.spacing.sm,
    padding: Layout.spacing.xs,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  foundIndicator: {
    backgroundColor: Colors.success[500],
  },
  notFoundIndicator: {
    backgroundColor: Colors.neutrals[300],
  },
  commentsCard: {
    marginBottom: Layout.spacing.md,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.md,
    paddingBottom: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutrals[200],
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Layout.spacing.sm,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  commentAuthor: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.neutrals[900],
  },
  commentDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutrals[500],
  },
  commentText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[800],
    lineHeight: 20,
  },
  addCommentContainer: {
    marginTop: Layout.spacing.md,
  },
  addCommentLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutrals[900],
    marginBottom: Layout.spacing.sm,
  },
  commentInputPlaceholder: {
    borderWidth: 1,
    borderColor: Colors.neutrals[300],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    minHeight: 100,
  },
  commentInputText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[500],
  },
});