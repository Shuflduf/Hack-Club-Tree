import { env } from '$env/dynamic/private';
import { Client } from 'pg';

export const client = new Client({
	connectionString: env.PG_CONNECTION_STRING
});
await client.connect();
