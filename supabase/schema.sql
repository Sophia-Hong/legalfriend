-- Create tables for the lease analysis application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Contracts table
CREATE TABLE IF NOT EXISTS contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  file_name TEXT NOT NULL,
  file_type TEXT,
  file_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Analyses table
CREATE TABLE IF NOT EXISTS analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE NOT NULL,
  summary TEXT,
  insights JSONB,
  benchmarks JSONB,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Key terms table
CREATE TABLE IF NOT EXISTS keyterms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE NOT NULL,
  provision TEXT NOT NULL,
  section TEXT,
  details JSONB NOT NULL,
  assessment JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Key term revisions table
CREATE TABLE IF NOT EXISTS keytermrevisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyterm_id UUID REFERENCES keyterms(id) ON DELETE CASCADE NOT NULL,
  original_text TEXT NOT NULL,
  revised_text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Term conversations table
CREATE TABLE IF NOT EXISTS termconversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyterm_id UUID REFERENCES keyterms(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  is_ai BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  contract_id UUID REFERENCES contracts(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending',
  stripe_payment_id TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create RLS policies

-- Profiles policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Contracts policies
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own contracts"
  ON contracts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own contracts"
  ON contracts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contracts"
  ON contracts FOR UPDATE
  USING (auth.uid() = user_id);

-- Analyses policies
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view analyses of their contracts"
  ON analyses FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM contracts
    WHERE contracts.id = analyses.contract_id
    AND contracts.user_id = auth.uid()
  ));

-- Key terms policies
ALTER TABLE keyterms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view key terms of their analyses"
  ON keyterms FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM analyses
    JOIN contracts ON contracts.id = analyses.contract_id
    WHERE analyses.id = keyterms.analysis_id
    AND contracts.user_id = auth.uid()
  ));

-- Key term revisions policies
ALTER TABLE keytermrevisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view revisions of their key terms"
  ON keytermrevisions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM keyterms
    JOIN analyses ON analyses.id = keyterms.analysis_id
    JOIN contracts ON contracts.id = analyses.contract_id
    WHERE keyterms.id = keytermrevisions.keyterm_id
    AND contracts.user_id = auth.uid()
  ));

-- Term conversations policies
ALTER TABLE termconversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own conversations"
  ON termconversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own conversations"
  ON termconversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Payments policies
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- Create triggers for updated_at

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to all tables with updated_at
CREATE TRIGGER update_profiles_modtime
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_contracts_modtime
BEFORE UPDATE ON contracts
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_analyses_modtime
BEFORE UPDATE ON analyses
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_keyterms_modtime
BEFORE UPDATE ON keyterms
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_keytermrevisions_modtime
BEFORE UPDATE ON keytermrevisions
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_payments_modtime
BEFORE UPDATE ON payments
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Create storage buckets
-- Note: This needs to be done via the Supabase dashboard or CLI
-- INSERT INTO storage.buckets (id, name) VALUES ('lease_documents', 'lease_documents');
-- INSERT INTO storage.buckets (id, name) VALUES ('avatars', 'avatars');
