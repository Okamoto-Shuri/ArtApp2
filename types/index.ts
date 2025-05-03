export interface User {
  id: string;
  line_user_id: string;
  display_name: string;
  profile_image_url: string;
  wallet_address?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  image_url: string;
  grid_size: 4 | 9 | 16 | 25 | 36;
  public_status: 'public' | 'private' | 'draft';
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  like_count?: number;
  comment_count?: number;
  progress?: ProjectProgress;
  is_liked?: boolean;
}

export interface Location {
  id: string;
  project_id: string;
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  grid_position_x: number;
  grid_position_y: number;
  qr_code_data: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectProgress {
  id: string;
  user_id: string;
  project_id: string;
  scanned_locations: ScannedLocation[];
  completion_status: boolean;
  nft_claimed: boolean;
  last_scanned_at: string;
  created_at: string;
  updated_at: string;
  collected_count: number;
  total_count: number;
  completion_percentage: number;
}

export interface ScannedLocation {
  location_id: string;
  grid_position_x: number;
  grid_position_y: number;
  scanned_at: string;
}

export interface NFT {
  id: string;
  project_id: string;
  nft_name: string;
  nft_description: string;
  nft_image_url: string;
  metadata_url: string;
  contract_address: string;
  max_supply: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  project_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user?: {
    display_name: string;
    profile_image_url: string;
  };
}