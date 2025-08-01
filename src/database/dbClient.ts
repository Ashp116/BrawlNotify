import { Pool, Client } from 'pg';
require('dotenv').config();

class PostgresClient {
    private static instance: Client;

    private constructor() {}

    public static async getInstance(): Promise<Client> {
        if (!PostgresClient.instance) {
            const client = new Client({
                connectionString: process.env.DATABASE_URI,
                ssl: {
                    rejectUnauthorized: false,
                },
            });

            await client.connect();
            PostgresClient.instance = client;

            PostgresClient.instance.on('error', (err) => {
                console.error('Unexpected PG client error', err);
                process.exit(-1);
            });
        }
        return PostgresClient.instance;
    }
}

export const DBClient = PostgresClient.getInstance();
