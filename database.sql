CREATE TABLE IF NOT EXISTS users (
  slack_id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  pfp_url TEXT NOT NULL,
  ornament_position POINT NOT NULL,
  -- likes INTEGER DEFAULT 0,
  decoration_index INTEGER NOT NULL,
  rotation INTEGER DEFAULT 0,
  flipped BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS likes (
  slack_id TEXT NOT NULL,
  liked_id TEXT NOT NULL,
)

