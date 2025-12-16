/**
 * Site Configuration
 *
 * Re-exports config values for use across the application.
 * Centralizes configuration access patterns.
 */
import { publicUrlConfig } from './env';

export const config = {
    baseUrl: publicUrlConfig.baseUrl,
    websiteUrl: publicUrlConfig.websiteUrl,
} as const;

export type Config = typeof config;
