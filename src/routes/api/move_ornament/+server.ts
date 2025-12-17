import { env } from '$env/dynamic/private';
import { client } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies, request }) => {
	const reqBody = await request.json();
	const ornamentPos = reqBody.position;
	const ornamentPosStr = `(${ornamentPos[0]}, ${ornamentPos[1]})`;
	const slack_id = await getSlackId(cookies.get('access_token') as string);
	const profile = await getProfileInfo(slack_id);
	const sqlInstruction = `
INSERT INTO users(slack_id, username, pfp_url, ornament_position, last_moved_at)
VALUES($1, $2, $3, $4, $5)
ON CONFLICT (slack_id)
DO UPDATE SET
	username = $2,
	pfp_url = $3,
	ornament_position = $4,
	last_moved_at = $5
`;
	const values = [
		slack_id,
		profile.display_name,
		profile.image_192,
		ornamentPosStr,
		new Date().toISOString()
	];
	const res = await client.query(sqlInstruction, values);
	console.log(reqBody);
	console.log(profile);
	console.log(res);

	// TODO: this might not be true
	return new Response(JSON.stringify({ success: true }));
};

async function getSlackId(accessToken: string): Promise<string> {
	const userInfoUrl = 'https://auth.hackclub.com/oauth/userinfo';
	const userInfoReq = await fetch(userInfoUrl, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	const userInfo = await userInfoReq.json();
	return userInfo.slack_id;
}

async function getProfileInfo(slackId: string): Promise<any> {
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
