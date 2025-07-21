'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies

export const GaspProvider = ({ children }: { children: React.ReactNode }) => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // gsap code here...
            gsap.to(container.current, { x: 360 }); // <-- automatically reverted
        },
        { scope: container },
    ); // <-- scope is for selector text (optional)

    return <div ref={container}>{children}</div>;
};

export default GaspProvider;
