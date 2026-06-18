-- Run this in your Supabase SQL editor
-- Creates the chats table for storing conversations

CREATE TABLE IF NOT EXISTS chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'New Chat',
  messages JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  shared BOOLEAN NOT NULL DEFAULT false,
  share_id TEXT
);

CREATE INDEX IF NOT EXISTS idx_chats_user_id ON chats(user_id);
CREATE INDEX IF NOT EXISTS idx_chats_share_id ON chats(share_id);

-- Enable Row Level Security
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

-- Allow users to CRUD their own chats
CREATE POLICY "Users can manage their own chats"
  ON chats
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow anyone to read shared chats
CREATE POLICY "Anyone can read shared chats"
  ON chats
  FOR SELECT
  USING (shared = true);
