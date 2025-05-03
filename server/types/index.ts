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
  created_at: Date;
  updated_at: Date;
}

export interface NFT {
  id: string;
  project_id: string;
  token_id: string;
  metadata_url: string;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProjectProgress {
  id: string;
  user_id: string;
  project_id: string;
  completion_status: boolean;
  nft_claimed: boolean;
  last_scanned_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ScannedLocation {
  id: string;
  progress_id: string;
  location_id: string;
  scanned_at: Date;
}