import { GoogleAnalytics } from '@next/third-parties/google';

type Props = {
    /** Optional comma-separated list of tag IDs (e.g., G-XXXX, AW-XXXX) */
    ids?: string;
};

/**
 * Google Tag (Analytics / Ads) via @next/third-parties.
 * Reads IDs from env by default and initializes gtag.
 *
 * Env vars:
 * - NEXT_PUBLIC_GOOGLE_TAG_IDS: comma-separated list of IDs
 *   Example: "G-XXXXXXXX,AW-YYYYYYYY"
 */
export default function GoogleTag({ ids }: Props) {
    const raw =
        ids ??
        process.env.NEXT_PUBLIC_GOOGLE_TAG_IDS ??
        process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;
    const list = raw
        ?.split(',')
        .map((s) => s.trim())
        .filter(Boolean);

    if (!list || list.length === 0) return null;

    // Render GoogleAnalytics component for each ID
    return (
        <>
            {list.map((id) => (
                <GoogleAnalytics key={id} gaId={id} />
            ))}
        </>
    );
}
