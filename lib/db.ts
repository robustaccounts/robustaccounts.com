import { neon, neonConfig } from '@neondatabase/serverless';

import { databaseConfig } from '@/lib/env';

type SqlClient = ReturnType<typeof neon>;

let cachedClient: SqlClient | null = null;

function getClient(): SqlClient {
    if (!cachedClient) {
        // Reduce control plane round-trips in dev by caching fetch connections
        neonConfig.fetchConnectionCache = true;
        cachedClient = neon(databaseConfig.url);
    }

    return cachedClient;
}

export const sql = getClient();
