import { env } from "$env/dynamic/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const profile = await getProfile(cookies.get("access_token") as string);
  return profile
}

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
	return slackInfo.user.profile
}
