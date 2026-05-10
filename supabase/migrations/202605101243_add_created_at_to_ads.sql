-- Migration: Add created_at to ads table
ALTER TABLE ads 
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- Update existing rows if any
UPDATE ads SET created_at = now() WHERE created_at IS NULL;
