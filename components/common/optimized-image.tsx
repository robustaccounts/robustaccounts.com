import Image, { ImageProps } from 'next/image';
import React from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
    src: string;
    alt: string;
    blur?: boolean;
}

/**
 * Optimized Image Component with WebP support and responsive loading
 * Automatically generates optimized versions and provides fallbacks
 *
 * @example
 * <OptimizedImage
 *   src="/assets/images/hero-bg.jpg"
 *   alt="Hero background"
 *   fill
 *   priority
 * />
 */
export default function OptimizedImage({
    src,
    alt,
    blur = true,
    ...props
}: OptimizedImageProps) {
    return (
        <Image
            src={src}
            alt={alt}
            {...(blur && {
                placeholder: 'blur',
                blurDataURL: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=`,
            })}
            quality={90}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
            {...props}
        />
    );
}
