import { config } from '@/lib/config';
import siteConfig from '@/siteconfig';

import { JsonLd } from './json-ld';

const baseUrl = config.baseUrl;

const ORGANIZATION_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    '@id': `${baseUrl}#organization`,
    name: siteConfig.firm.name,
    url: baseUrl,
    logo: `${baseUrl}/assets/logo.png`,
    image: `${baseUrl}/assets/logo.png`,
    description:
        'Professional accounting, bookkeeping, payroll, and financial advisory services for small businesses and growing companies.',
    telephone: siteConfig.contactInfo.phoneDisplay,
    email: siteConfig.contactInfo.emailDisplay,
    address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.contactInfo.address.street,
        addressLocality: siteConfig.contactInfo.address.city,
        addressRegion: siteConfig.contactInfo.address.stateProvince,
        postalCode: siteConfig.contactInfo.address.postalCode,
        addressCountry: siteConfig.contactInfo.address.country,
    },
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: siteConfig.contactInfo.phoneDisplay,
        email: siteConfig.contactInfo.emailDisplay,
        contactType: 'customer service',
        availableLanguage: ['English'],
        areaServed: ['US', 'CA'],
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '$$',
    areaServed: [
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'Canada' },
    ],
};

const WEBSITE_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    url: baseUrl,
    name: siteConfig.firm.name,
    publisher: { '@id': `${baseUrl}#organization` },
    inLanguage: 'en-US',
};

export function SiteSchema() {
    return <JsonLd data={[ORGANIZATION_SCHEMA, WEBSITE_SCHEMA]} />;
}
