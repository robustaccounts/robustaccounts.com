import { env } from './env';

export const config = {
    baseUrl: env.NEXT_PUBLIC_WEBSITE_URL,
} as const;
