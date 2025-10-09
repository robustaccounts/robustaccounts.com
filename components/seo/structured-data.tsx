import React from 'react';

interface OrganizationSchema {
    name: string;
    url: string;
    logo: string;
    description: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    phone?: string;
    email?: string;
    socialMedia?: string[];
}

interface ServiceSchema {
    name: string;
    description: string;
    url: string;
    provider: string;
    areaServed?: string;
    serviceType?: string;
}

/**
 * Organization Structured Data Component
 * Generates JSON-LD schema for organization information
 */
export function OrganizationStructuredData({
    name,
    url,
    logo,
    description,
    address,
    phone,
    email,
    socialMedia = [],
}: OrganizationSchema) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name,
        url,
        logo,
        description,
        ...(address && {
            address: {
                '@type': 'PostalAddress',
                streetAddress: address.street,
                addressLocality: address.city,
                addressRegion: address.state,
                postalCode: address.zip,
                addressCountry: address.country,
            },
        }),
        ...(phone && { telephone: phone }),
        ...(email && { email }),
        ...(socialMedia.length > 0 && { sameAs: socialMedia }),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/**
 * Service Structured Data Component
 * Generates JSON-LD schema for services
 */
export function ServiceStructuredData({
    name,
    description,
    url,
    provider,
    areaServed = 'United States',
    serviceType,
}: ServiceSchema) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        url,
        provider: {
            '@type': 'Organization',
            name: provider,
        },
        areaServed,
        ...(serviceType && { serviceType }),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/**
 * Breadcrumb Structured Data Component
 */
export function BreadcrumbStructuredData({
    items,
}: {
    items: Array<{ name: string; url: string }>;
}) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/**
 * FAQ Structured Data Component
 */
export function FAQStructuredData({
    faqs,
}: {
    faqs: Array<{ question: string; answer: string }>;
}) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
