CREATE TABLE IF NOT EXISTS companion_records (
 id TEXT PRIMARY KEY, owner_id TEXT NOT NULL, kind TEXT NOT NULL, day TEXT NOT NULL DEFAULT '', slot TEXT NOT NULL DEFAULT '', title TEXT NOT NULL, venue TEXT NOT NULL DEFAULT '', address TEXT NOT NULL DEFAULT '', category TEXT NOT NULL DEFAULT '', amount_fen INTEGER NOT NULL DEFAULT 0, done INTEGER NOT NULL DEFAULT 0, due_at TEXT, created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS companion_name_idx ON companion_records(owner_id);
CREATE TABLE IF NOT EXISTS travel_memories (
 id TEXT PRIMARY KEY, owner_id TEXT NOT NULL, day TEXT NOT NULL, place TEXT NOT NULL DEFAULT '', feeling TEXT NOT NULL DEFAULT '', photo_keys TEXT NOT NULL DEFAULT '[]', created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS memories_owner_idx ON travel_memories(owner_id);
CREATE TABLE IF NOT EXISTS diary_photos (key TEXT PRIMARY KEY, bytes BLOB NOT NULL);
