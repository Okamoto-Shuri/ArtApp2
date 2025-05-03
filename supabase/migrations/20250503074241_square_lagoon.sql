-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  line_user_id TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  profile_image_url TEXT,
  wallet_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  grid_size INTEGER NOT NULL,
  public_status TEXT DEFAULT 'draft',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Locations table
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL,
  grid_position_x INTEGER NOT NULL,
  grid_position_y INTEGER NOT NULL,
  qr_code_data TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- NFTs table
CREATE TABLE nfts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  token_id TEXT UNIQUE,
  metadata_url TEXT NOT NULL,
  owner_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project progress table
CREATE TABLE project_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  project_id UUID REFERENCES projects(id),
  completion_status BOOLEAN DEFAULT FALSE,
  nft_claimed BOOLEAN DEFAULT FALSE,
  last_scanned_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, project_id)
);

-- Scanned locations table
CREATE TABLE scanned_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  progress_id UUID REFERENCES project_progress(id),
  location_id UUID REFERENCES locations(id),
  scanned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(progress_id, location_id)
);

-- Create indexes
CREATE INDEX idx_projects_owner ON projects(owner_id);
CREATE INDEX idx_locations_project ON locations(project_id);
CREATE INDEX idx_nfts_project ON nfts(project_id);
CREATE INDEX idx_progress_user ON project_progress(user_id);
CREATE INDEX idx_progress_project ON project_progress(project_id);
CREATE INDEX idx_scanned_progress ON scanned_locations(progress_id);
CREATE INDEX idx_scanned_location ON scanned_locations(location_id);