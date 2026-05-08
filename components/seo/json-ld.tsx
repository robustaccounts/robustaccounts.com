import React from 'react';

type Schema = Record<string, unknown>;

export function JsonLd({ data }: { data: Schema | Schema[] }) {
    const payload = Array.isArray(data) ? data : [data];
    return (
        <>
            {payload.map((item, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    // JSON.stringify is safe here — values are server-controlled.
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
                />
            ))}
        </>
    );
}
