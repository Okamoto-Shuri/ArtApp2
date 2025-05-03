import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, MapPin } from 'lucide-react-native';
import { Link } from 'expo-router';
import { Project } from '@/types';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Card from './Card';
import ProgressIndicator from './ProgressIndicator';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const {
    id,
    title,
    image_url,
    description,
    start_date,
    end_date,
    like_count = 0,
    comment_count = 0,
    progress,
  } = project;

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Check if project is active
  const isActive = () => {
    const now = new Date();
    const start = new Date(start_date);
    const end = new Date(end_date);
    return now >= start && now <= end;
  };

  // Truncate description
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Link href={`/projects/${id}`} asChild>
      <TouchableOpacity activeOpacity={0.8}>
        <Card style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: image_url || 'https://images.pexels.com/photos/2747447/pexels-photo-2747447.jpeg' }}
              style={styles.image}
              resizeMode="cover"
            />
            {progress && (
              <View style={styles.progressContainer}>
                <ProgressIndicator
                  progress={progress.completion_percentage}
                  size={40}
                  showText
                />
              </View>
            )}
            {isActive() ? (
              <View style={[styles.badge, styles.activeBadge]}>
                <Text style={styles.badgeText}>Active</Text>
              </View>
            ) : (
              <View style={[styles.badge, styles.inactiveBadge]}>
                <Text style={styles.badgeText}>
                  {new Date() < new Date(start_date) ? 'Upcoming' : 'Ended'}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>
              {truncateText(description, 100)}
            </Text>

            <View style={styles.metaContainer}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>
                  {formatDate(start_date)} - {formatDate(end_date)}
                </Text>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Heart size={16} color={Colors.neutrals[600]} />
                  <Text style={styles.statText}>{like_count}</Text>
                </View>
                <View style={styles.statItem}>
                  <MessageCircle size={16} color={Colors.neutrals[600]} />
                  <Text style={styles.statText}>{comment_count}</Text>
                </View>
                <View style={styles.statItem}>
                  <MapPin size={16} color={Colors.neutrals[600]} />
                  <Text style={styles.statText}>
                    {progress ? `${progress.collected_count}/${progress.total_count}` : '0/0'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Layout.spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 160,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  progressContainer: {
    position: 'absolute',
    bottom: Layout.spacing.md,
    right: Layout.spacing.md,
  },
  badge: {
    position: 'absolute',
    top: Layout.spacing.md,
    left: Layout.spacing.md,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: Layout.borderRadius.sm,
  },
  activeBadge: {
    backgroundColor: Colors.success[500],
  },
  inactiveBadge: {
    backgroundColor: Colors.neutrals[600],
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: Layout.spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutrals[900],
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.neutrals[700],
    marginBottom: Layout.spacing.md,
    lineHeight: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    color: Colors.neutrals[600],
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Layout.spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: Colors.neutrals[700],
  },
});