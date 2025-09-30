import Script from 'next/script';

type Props = {
  /** Optional comma-separated list of tag IDs (e.g., G-XXXX, AW-XXXX) */
  ids?: string;
};

/**
 * Google Tag (Analytics / Ads) via next/script.
 * Reads IDs from env by default and initializes gtag afterInteractive.
 *
 * Env vars:
 * - NEXT_PUBLIC_GOOGLE_TAG_IDS: comma-separated list of IDs
 *   Example: "G-XXXXXXXX,AW-YYYYYYYY"
 */
export default function GoogleTag({ ids }: Props) {
  const raw = ids ?? process.env.NEXT_PUBLIC_GOOGLE_TAG_IDS ?? process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? 'AW-17600938444';
  const list = raw
    ?.split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (!list || list.length === 0) return null;

  // Use the first ID for the GTM script src; config all IDs below.
  const primary = list[0];

  const init = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    ${list.map((id) => `gtag('config', '${id}');`).join('\n    ')}
  `;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primary}`}
        strategy="afterInteractive"
        id="gtag-src"
      />
      <Script id="gtag-init" strategy="afterInteractive">{init}</Script>
    </>
  );
}

