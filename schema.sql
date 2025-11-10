-- Create NDA table
CREATE TABLE IF NOT EXISTS ndas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  sent_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reminder_sent TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'sent',
  locked BOOLEAN DEFAULT FALSE,
  file_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE ndas ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to view all NDAs
CREATE POLICY "Users can view all NDAs"
  ON ndas FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users to insert NDAs
CREATE POLICY "Users can insert NDAs"
  ON ndas FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to update NDAs
CREATE POLICY "Users can update NDAs"
  ON ndas FOR UPDATE
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ndas_updated_at
  BEFORE UPDATE ON ndas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
