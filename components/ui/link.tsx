"use client";

import NextLink from 'next/link';

// Simplified, safe Link wrapper that defers to Next.js defaults.
// Restores built-in prefetching and avoids custom image prefetch calls
// to a non-existent endpoint.
export const Link: typeof NextLink = (({ children, ...props }) => {
  return (
    <NextLink {...props} prefetch={props.prefetch}>
      {children}
    </NextLink>
  );
}) as typeof NextLink;

export default Link;
