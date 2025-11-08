-- RecyCool Database Schema for Supabase
-- Jalankan script ini di Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_bottle_submit TIMESTAMP WITH TIME ZONE
);

-- Products Table (Merchandise)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  points_required INTEGER NOT NULL,
  stock INTEGER DEFAULT 0,
  bottles_needed INTEGER, -- berapa botol untuk buat 1 item
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Redemptions Table
CREATE TABLE redemptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL, -- snapshot nama produk
  points_spent INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  ticket_code VARCHAR(50) UNIQUE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  confirmed_by UUID REFERENCES users(id) ON DELETE SET NULL
);

-- RVM (Reverse Vending Machine) Data
CREATE TABLE rvm_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  bottles_submitted INTEGER NOT NULL,
  points_earned INTEGER NOT NULL,
  submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RVM Status
CREATE TABLE rvm_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  is_online BOOLEAN DEFAULT false,
  total_bottles_collected INTEGER DEFAULT 0,
  total_users INTEGER DEFAULT 0,
  online_hours DECIMAL(10, 2) DEFAULT 0,
  last_online TIMESTAMP WITH TIME ZONE,
  last_offline TIMESTAMP WITH TIME ZONE,
  ssh_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Website Traffic
CREATE TABLE website_traffic (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_url VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_redemptions_user_id ON redemptions(user_id);
CREATE INDEX idx_redemptions_status ON redemptions(status);
CREATE INDEX idx_rvm_data_user_id ON rvm_data(user_id);
CREATE INDEX idx_rvm_data_date ON rvm_data(submission_date);
CREATE INDEX idx_website_traffic_user_id ON website_traffic(user_id);
CREATE INDEX idx_website_traffic_date ON website_traffic(visited_at);

-- Insert default RVM status
INSERT INTO rvm_status (is_online, total_bottles_collected, total_users, online_hours)
VALUES (false, 0, 0, 0);

-- Insert sample products (optional - bisa disesuaikan)
INSERT INTO products (name, description, points_required, stock, bottles_needed, category) VALUES
('Gantungan Kunci RecyCool', 'Gantungan kunci custom dari plastik daur ulang', 50, 100, 5, 'Accessories'),
('Totebag Reusable', 'Tas belanja ramah lingkungan dari material daur ulang', 150, 50, 15, 'Bags'),
('Coaster Set', 'Set 4 coaster dari plastik daur ulang dengan desain menarik', 100, 75, 10, 'Home Decor');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_redemptions_updated_at BEFORE UPDATE ON redemptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rvm_status_updated_at BEFORE UPDATE ON rvm_status
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate ticket code
CREATE OR REPLACE FUNCTION generate_ticket_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
BEGIN
  code := 'RCY-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rvm_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE rvm_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_traffic ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Products policies
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Redemptions policies
CREATE POLICY "Users can view their own redemptions" ON redemptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create redemptions" ON redemptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all redemptions" ON redemptions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update redemptions" ON redemptions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RVM Data policies
CREATE POLICY "Anyone can view RVM data" ON rvm_data
  FOR SELECT USING (true);

CREATE POLICY "System can insert RVM data" ON rvm_data
  FOR INSERT WITH CHECK (true);

-- RVM Status policies
CREATE POLICY "Anyone can view RVM status" ON rvm_status
  FOR SELECT USING (true);

CREATE POLICY "Admins can update RVM status" ON rvm_status
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Website Traffic policies
CREATE POLICY "System can insert traffic data" ON website_traffic
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view traffic data" ON website_traffic
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create admin user (UBAH PASSWORD INI!)
-- Password default: Admin123!
-- Hash ini untuk bcrypt, tapi sebaiknya di-hash di aplikasi
-- Ini hanya contoh, sebaiknya buat admin lewat aplikasi
INSERT INTO users (email, full_name, password_hash, role, points)
VALUES ('admin@recycool.id', 'Admin RecyCool', '$2a$10$YourHashedPasswordHere', 'admin', 0);

-- Notes untuk development:
-- 1. Jangan lupa update Supabase URL dan anon key di .env.local
-- 2. Password admin harus di-hash menggunakan bcrypt sebelum insert
-- 3. RLS policies disesuaikan dengan auth.uid() dari Supabase Auth
-- 4. Untuk production, enable RLS dan pastikan semua policies sudah benar
