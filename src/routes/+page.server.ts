import { env } from '$env/dynamic/private';
import { client } from '$lib/server/lib';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	let profile: any = undefined;
	const accessToken = cookies.get('access_token');
	if (accessToken != undefined) {
		profile = await getProfile(accessToken);
		await updateProfileOrn(profile);
	}
	return profile;
};

async function getProfile(access_token: string): Promise<any> {
	const userInfoUrl = 'https://auth.hackclub.com/oauth/userinfo';
	const userInfoReq = await fetch(userInfoUrl, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});
	const userInfo = await userInfoReq.json();

	const slackInfoUrl = 'https://slack.com/api/users.info';
	const slackInfoReq = await fetch(slackInfoUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			token: env.SLACK_BOT_OAUTH_TOKEN,
			user: userInfo.slack_id
		})
	});
	const slackInfo = await slackInfoReq.json();
	console.log(slackInfo);
	return {
		profile: slackInfo.user.profile,
		slack_id: slackInfo.user.id
	};
}

async function updateProfileOrn(userInfo: any) {
	const sqlInstruction = `
UPDATE users
SET 
	username = $2,
	pfp_url = $3
WHERE slack_id = $1;
	`;
	await client.query(sqlInstruction, [
		userInfo.slack_id,
		userInfo.profile.display_name,
		userInfo.profile.image_192
	]);
	// console.log(res);
}
