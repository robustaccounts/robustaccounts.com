import crypto from 'crypto';

/**
 * Generate a unique reschedule token for a lead
 */
export async function generateRescheduleToken(leadId: number): Promise<string> {
    // Create a token that includes leadId and timestamp for uniqueness
    const timestamp = Date.now();
    const randomBytes = crypto.randomBytes(16).toString('hex');
    const token = `${leadId}-${timestamp}-${randomBytes}`;
    
    // Store token in database (we could add a reschedule_tokens table, but for simplicity,
    // we'll just encode it in the token itself)
    return Buffer.from(token).toString('base64url');
}

/**
 * Decode reschedule token to get leadId
 */
export async function decodeRescheduleToken(token: string): Promise<number | null> {
    try {
        const decoded = Buffer.from(token, 'base64url').toString('utf-8');
        const parts = decoded.split('-');
        if (parts.length >= 1) {
            return parseInt(parts[0], 10);
        }
        return null;
    } catch {
        return null;
    }
}

