-- Create admin tables for the lease analysis application

-- Prompts table to store different prompt templates
CREATE TABLE IF NOT EXISTS prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Prompt versions table to store different versions of prompts
CREATE TABLE IF NOT EXISTS prompt_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE NOT NULL,
  version INTEGER NOT NULL,
  content TEXT NOT NULL,
  output_schema JSONB NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  UNIQUE(prompt_id, version)
);

-- Admin settings table
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Admin logs table
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create RLS policies

-- Prompts policies
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view prompts"
  ON prompts FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Only admins can insert prompts"
  ON prompts FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Only admins can update prompts"
  ON prompts FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Only admins can delete prompts"
  ON prompts FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

-- Prompt versions policies
ALTER TABLE prompt_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view prompt versions"
  ON prompt_versions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Only admins can insert prompt versions"
  ON prompt_versions FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Only admins can update prompt versions"
  ON prompt_versions FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Only admins can delete prompt versions"
  ON prompt_versions FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

-- Admin settings policies
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view admin settings"
  ON admin_settings FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Only admins can insert admin settings"
  ON admin_settings FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Only admins can update admin settings"
  ON admin_settings FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

-- Admin logs policies
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view admin logs"
  ON admin_logs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Only admins can insert admin logs"
  ON admin_logs FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

-- Add triggers for updated_at
CREATE TRIGGER update_prompts_modtime
BEFORE UPDATE ON prompts
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_prompt_versions_modtime
BEFORE UPDATE ON prompt_versions
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_admin_settings_modtime
BEFORE UPDATE ON admin_settings
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Insert default admin settings
INSERT INTO admin_settings (key, value, description)
VALUES 
  ('file_upload_limits', '{"max_file_size_mb": 10, "allowed_extensions": ["pdf", "docx", "doc", "jpg", "jpeg", "png"]}', 'File upload limits for lease documents'),
  ('payment_settings', '{"price_usd": 19.99, "currency": "usd"}', 'Payment settings for lease analysis'),
  ('ai_settings', '{"model": "mistral-large-latest", "temperature": 0.2, "max_tokens": 4000}', 'AI model settings');

-- Insert default lease analysis prompt
INSERT INTO prompts (name, description, is_active)
VALUES ('Lease Analysis', 'Analyzes lease agreements to extract key terms and provide insights', true);

-- Insert default prompt version
INSERT INTO prompt_versions (prompt_id, version, content, output_schema, is_active)
VALUES (
  (SELECT id FROM prompts WHERE name = 'Lease Analysis'),
  1,
  'You are a legal expert specializing in lease agreements. Analyze the following lease document and provide:
  
1. A concise summary of the lease (max 300 words)
2. Key terms with their details, organized by provision (rent, security deposit, termination, etc.)
3. Assessment of each key term (favorable, standard, or concerning)
4. Market context and insights for concerning terms

For each key term, include:
- Provision name
- Section reference
- Specific details from the lease
- Assessment (success, warning, or error) with explanation

Format your response as a JSON object with the following structure:
{
  "summary": "string",
  "keyTerms": [
    {
      "provision": "string",
      "section": "string",
      "details": ["string"],
      "assessment": {
        "type": "success|warning|error",
        "text": "string",
        "info": "string"
      }
    }
  ],
  "insights": {},
  "benchmarks": {}
}

Here is the lease document:
${text}',
  '{
    "type": "object",
    "properties": {
      "summary": {
        "type": "string",
        "description": "A concise summary of the lease agreement"
      },
      "keyTerms": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "provision": {
              "type": "string",
              "description": "Name of the lease provision"
            },
            "section": {
              "type": "string",
              "description": "Section reference in the lease document"
            },
            "details": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Specific details from the lease"
            },
            "assessment": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "enum": ["success", "warning", "error"],
                  "description": "Assessment type (favorable, standard, concerning)"
                },
                "text": {
                  "type": "string",
                  "description": "Explanation of the assessment"
                },
                "info": {
                  "type": "string",
                  "description": "Additional context or information"
                }
              },
              "required": ["type", "text"]
            }
          },
          "required": ["provision", "section", "details", "assessment"]
        }
      },
      "insights": {
        "type": "object",
        "description": "Additional insights about the lease"
      },
      "benchmarks": {
        "type": "object",
        "description": "Benchmarks against standard leases"
      }
    },
    "required": ["summary", "keyTerms"]
  }',
  true
);
