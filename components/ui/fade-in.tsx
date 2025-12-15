'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

import cn from '@/lib/cn';

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    fullWidth?: boolean;
}

export default function FadeIn({
    children,
    className,
    delay = 0,
    direction = 'up',
    fullWidth = false,
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });

    const directionOffset = {
        up: { y: 20, x: 0 },
        down: { y: -20, x: 0 },
        left: { x: 20, y: 0 },
        right: { x: -20, y: 0 },
        none: { x: 0, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                ...directionOffset[direction],
            }}
            animate={
                isInView
                    ? {
                          opacity: 1,
                          x: 0,
                          y: 0,
                      }
                    : {
                          opacity: 0,
                          ...directionOffset[direction],
                      }
            }
            transition={{
                duration: 0.5,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={cn(fullWidth ? 'w-full' : '', className)}
        >
            {children}
        </motion.div>
    );
}
