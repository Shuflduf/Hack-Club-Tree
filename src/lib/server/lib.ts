import { env } from '$env/dynamic/private';
import type { Ornament } from '$lib';
import { Client, types } from 'pg';

types.setTypeParser(1114, (str) => new Date(str + 'Z'));

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

export async function getSingleOrnament(targetId: string): Promise<Ornament | null> {
	const sqlInstruction = `
SELECT u.*, COUNT(l.slack_id) as likes
FROM users u
LEFT JOIN likes l ON u.slack_id = l.liked_id
WHERE u.slack_id = $1
GROUP BY u.slack_id;
`;
	const res = await client.query(sqlInstruction, [targetId]);
	console.log(res.rows);
	if (res.rows.length < 1) {
		return null;
	}
	const ornamentData = res.rows[0];
	const ornament: Ornament = {
		...ornamentData,
		ornament_position: [ornamentData.ornament_position.x, ornamentData.ornament_position.y]
	};
	// .map((row) => {
	// 	row.ornament_position = [row.ornament_position.x, row.ornament_position.y];
	// 	return row;
	// });
	return ornament;
}

export async function getSlackProfile(slackId: string): Promise<any> {
	const slackInfoUrl = 'https://slack.com/api/users.info';
	const slackInfoReq = await fetch(slackInfoUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			token: env.SLACK_BOT_OAUTH_TOKEN,
			user: slackId
		})
	});
	const slackInfo = await slackInfoReq.json();
	return slackInfo.user.profile;
}
