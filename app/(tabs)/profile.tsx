import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Settings, Bell, Medal, Camera, LogOut, ChevronRight } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  
  // Mock user data
  const mockUser = {
    id: 'user123',
    display_name: 'Alex Thompson',
    profile_image_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    wallet_address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    stats: {
      projects_joined: 5,
      completed_projects: 2,
      nfts_earned: 2,
      total_scans: 42,
    },
  };
  
  // Use either real user data or mock data
  const userData = user || mockUser;
  
  // Format wallet address for display
  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Settings size={24} color={Colors.neutrals[800]} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.userInfo}>
          <Image
            source={{ uri: userData.profile_image_url }}
            style={styles.avatar}
          />
          
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{userData.display_name}</Text>
            {userData.wallet_address && (
              <Text style={styles.walletAddress}>
                {formatWalletAddress(userData.wallet_address)}
              </Text>
            )}
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.stats.projects_joined}</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.stats.completed_projects}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.stats.nfts_earned}</Text>
            <Text style={styles.statLabel}>NFTs</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.stats.total_scans}</Text>
            <Text style={styles.statLabel}>Scans</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>My Account</Text>
        
        <Card style={styles.menuCard}>
          <Link href="/nft-gallery" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIconContainer, { backgroundColor: Colors.accent[100] }]}>
                  <Medal size={20} color={Colors.accent[500]} />
                </View>
                <Text style={styles.menuItemText}>NFT Gallery</Text>
              </View>
              <ChevronRight size={20} color={Colors.neutrals[400]} />
            </TouchableOpacity>
          </Link>
          
          <View style={styles.menuDivider} />
          
          <Link href="/notifications" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIconContainer, { backgroundColor: Colors.primary[100] }]}>
                  <Bell size={20} color={Colors.primary[500]} />
                </View>
                <Text style={styles.menuItemText}>Notifications</Text>
              </View>
              <ChevronRight size={20} color={Colors.neutrals[400]} />
            </TouchableOpacity>
          </Link>
          
          <View style={styles.menuDivider} />
          
          <Link href="/qr-scanner" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIconContainer, { backgroundColor: Colors.success[100] }]}>
                  <Camera size={20} color={Colors.success[500]} />
                </View>
                <Text style={styles.menuItemText}>Scan QR Code</Text>
              </View>
              <ChevronRight size={20} color={Colors.neutrals[400]} />
            </TouchableOpacity>
          </Link>
        </Card>
        
        <Card style={styles.logoutCard}>
          <TouchableOpacity 
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIconContainer, { backgroundColor: Colors.error[100] }]}>
                <LogOut size={20} color={Colors.error[500]} />
              </View>
              <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </Card>
        
        <Text style={styles.versionText}>App version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutrals[50],
  },
  header: {
    backgroundColor: Colors.white,
    paddingTop: 60,
    paddingBottom: Layout.spacing.lg,
    paddingHorizontal: Layout.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutrals[200],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.neutrals[900],
  },
  iconButton: {
    padding: Layout.spacing.xs,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  userDetails: {
    marginLeft: Layout.spacing.md,
  },
  userName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutrals[900],
  },
  walletAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[600],
    marginTop: 2,
  },
  content: {
    padding: Layout.spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.primary[500],
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutrals[600],
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: Colors.neutrals[200],
    alignSelf: 'center',
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutrals[900],
    marginBottom: Layout.spacing.md,
  },
  menuCard: {
    marginBottom: Layout.spacing.md,
    padding: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Layout.spacing.md,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  menuItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutrals[800],
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.neutrals[200],
    marginHorizontal: Layout.spacing.md,
  },
  logoutCard: {
    padding: 0,
    marginBottom: Layout.spacing.xl,
  },
  logoutItem: {
    justifyContent: 'flex-start',
  },
  logoutText: {
    color: Colors.error[500],
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[500],
    textAlign: 'center',
  },
});