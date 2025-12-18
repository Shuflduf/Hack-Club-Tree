import { env } from '$env/dynamic/private';
import { Client } from 'pg';

export const client = new Client({
	connectionString: env.PG_CONNECTION_STRING
});
await client.connect();

export async function getSlackId(accessToken: string): Promise<string> {
	const userInfoUrl = 'https://auth.hackclub.com/oauth/userinfo';
	const userInfoReq = await fetch(userInfoUrl, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	const userInfo = await userInfoReq.json();
	return userInfo.slack_id;
}
