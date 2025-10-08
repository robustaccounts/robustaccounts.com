import { put } from '@vercel/blob';

import { config } from 'dotenv';
import { readFile } from 'fs/promises';
import { join } from 'path';

// Load environment variables from .env file
config();

async function uploadEmailAssets() {
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    if (!token) {
        throw new Error(
            'BLOB_READ_WRITE_TOKEN environment variable is required',
        );
    }

    try {
        console.log('Uploading email assets to Vercel Blob...\n');

        // Logo already uploaded, skipping
        const logoUrl =
            'https://zqjl1difgpgsu6cq.public.blob.vercel-storage.com/email-assets/logo.png';
        console.log('✓ Logo (already uploaded):', logoUrl);

        // Upload Google Calendar icon
        const calendarIconPath = join(
            process.cwd(),
            'public/assets/icons/google-calendar.png',
        );
        const calendarIconBuffer = await readFile(calendarIconPath);

        console.log('\nUploading google-calendar-icon.png...');
        const calendarBlob = await put(
            'email-assets/google-calendar-icon.png',
            calendarIconBuffer,
            {
                access: 'public',
                token,
                contentType: 'image/png',
                addRandomSuffix: false,
            },
        );
        console.log('✓ Google Calendar icon uploaded:', calendarBlob.url);

        console.log('\n✓ All assets uploaded successfully!\n');
        console.log('Update your .env file with these URLs:');
        console.log(`EMAIL_LOGO_URL=${logoUrl}`);
        console.log(`EMAIL_GOOGLE_CALENDAR_ICON_URL=${calendarBlob.url}`);

        return {
            logoUrl: logoUrl,
            calendarIconUrl: calendarBlob.url,
        };
    } catch (error) {
        console.error('Error uploading assets:', error);
        throw error;
    }
}

uploadEmailAssets()
    .then(() => {
        console.log('\nDone!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Failed:', error);
        process.exit(1);
    });
