import { neon } from '@neondatabase/serverless';

import { databaseConfig } from '@/lib/env';

type SqlClient = ReturnType<typeof neon>;

let cachedClient: SqlClient | null = null;

function getClient(): SqlClient {
    if (!cachedClient) {
        // fetchConnectionCache is now always true by default (no need to set)
        cachedClient = neon(databaseConfig.url);
    }

    return cachedClient;
}

export const sql = getClient();
