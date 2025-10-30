-- Add resolved column to leads table (in two steps to handle existing data)
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS resolved BOOLEAN;

-- Set default value for existing rows
UPDATE leads SET resolved = FALSE WHERE resolved IS NULL;

-- Now make it NOT NULL with default
ALTER TABLE leads 
ALTER COLUMN resolved SET DEFAULT FALSE,
ALTER COLUMN resolved SET NOT NULL;

-- Create index on resolved column for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_resolved ON leads(resolved);

-- Create index on appointment_datetime for reminder queries
CREATE INDEX IF NOT EXISTS idx_leads_appointment_datetime ON leads(appointment_datetime);

-- Create lead_audit_logs table for tracking lead changes
CREATE TABLE IF NOT EXISTS lead_audit_logs (
    id SERIAL PRIMARY KEY,
    lead_id INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL,
    old_value JSONB,
    new_value JSONB,
    changed_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index on lead_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_lead_audit_logs_lead_id ON lead_audit_logs(lead_id);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_lead_audit_logs_created_at ON lead_audit_logs(created_at);

-- Add created_at column to leads if it doesn't exist
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE;

-- Set default for existing rows
UPDATE leads SET created_at = NOW() WHERE created_at IS NULL;

-- Make it NOT NULL with default
ALTER TABLE leads 
ALTER COLUMN created_at SET DEFAULT NOW(),
ALTER COLUMN created_at SET NOT NULL;

-- Create index on created_at
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- Add updated_at column to leads if it doesn't exist
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE;

-- Set default for existing rows
UPDATE leads SET updated_at = created_at WHERE updated_at IS NULL;

-- Make it NOT NULL with default
ALTER TABLE leads 
ALTER COLUMN updated_at SET DEFAULT NOW(),
ALTER COLUMN updated_at SET NOT NULL;

-- Create index on updated_at
CREATE INDEX IF NOT EXISTS idx_leads_updated_at ON leads(updated_at);

