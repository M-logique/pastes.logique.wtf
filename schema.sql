CREATE TABLE IF NOT EXISTS pastes (
  namespace TEXT PRIMARY KEY,
  access_key TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS files (
  paste_namespace TEXT NOT NULL REFERENCES pastes(namespace) ON DELETE CASCADE,
  file_index INTEGER NOT NULL CHECK (file_index >= 0),
  filename TEXT,
  language TEXT,
  content TEXT NOT NULL,
  PRIMARY KEY (paste_namespace, file_index)
);

CREATE INDEX IF NOT EXISTS idx_pastes_access_key ON pastes (access_key);
CREATE INDEX IF NOT EXISTS idx_files_language ON files (language);
