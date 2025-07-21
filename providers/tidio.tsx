import Script from 'next/script';
import React from 'react';

export default function Tidio() {
    return (
        <Script
            src="https://code.tidio.co/20250712/tidio.js"
            strategy="beforeInteractive"
        />
    );
}
