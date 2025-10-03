-- Migration: Remove SMS-related columns from leads table
-- Description: Removes sms_opt_out and sms_updates columns as SMS functionality is no longer used
-- Date: 2025-01-XX

-- Drop the SMS-related columns from the leads table
ALTER TABLE leads DROP COLUMN IF EXISTS sms_opt_out;
ALTER TABLE leads DROP COLUMN IF EXISTS sms_updates;

-- Note: If you need to rollback this migration, use the following:
-- ALTER TABLE leads ADD COLUMN sms_opt_out BOOLEAN DEFAULT false;
-- ALTER TABLE leads ADD COLUMN sms_updates BOOLEAN DEFAULT false;

