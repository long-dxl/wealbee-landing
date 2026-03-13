-- =============================================
-- Supabase SQL: Tạo bảng subscribers
-- Chạy trong Supabase Dashboard > SQL Editor
-- =============================================

-- 1. Tạo bảng subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email      TEXT NOT NULL UNIQUE,
  source     TEXT DEFAULT 'hero' CHECK (source IN ('hero', 'footer')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Bật Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- 3. Policy: cho phép anonymous INSERT (đăng ký email từ frontend)
CREATE POLICY "Allow anonymous insert" ON subscribers
  FOR INSERT
  WITH CHECK (true);

-- 4. Policy: chỉ cho authenticated users (admin) SELECT
CREATE POLICY "Allow authenticated read" ON subscribers
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- 5. Tạo index cho tìm kiếm nhanh theo email
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers (email);

-- 6. Tạo index cho filter theo source
CREATE INDEX IF NOT EXISTS idx_subscribers_source ON subscribers (source);
