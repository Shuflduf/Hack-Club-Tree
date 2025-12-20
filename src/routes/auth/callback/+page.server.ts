import { env } from '$env/dynamic/private';
import { env as penv } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import { getSlackId, getSlackProfile } from '$lib/server/lib';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const authTokenUrl = 'https://auth.hackclub.com/oauth/token';
	const reqParams = {
		client_id: penv.PUBLIC_HCA_CLIENT_ID,
		client_secret: env.HCA_CLIENT_SECRET,
		redirect_uri: penv.PUBLIC_HCA_REDIRECT,
		code: code,
		grant_type: 'authorization_code'
	};
	const req = await fetch(authTokenUrl, {
		method: 'POST',
		body: new URLSearchParams(reqParams as any)
	});
	const response = await req.json();

	cookies.set('access_token', response.access_token, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		maxAge: 3600
	});

	// const userInfoUrl = 'https://auth.hackclub.com/oauth/userinfo';
	// const userInfoReq = await fetch(userInfoUrl, {
	// 	headers: {
	// 		Authorization: `Bearer ${response.access_token}`
	// 	}
	// });
	// const userInfo = await userInfoReq.json();

	// const slackInfoUrl = 'https://slack.com/api/users.info';
	// const slackInfoReq = await fetch(slackInfoUrl, {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/x-www-form-urlencoded'
	// 	},
	// 	body: new URLSearchParams({
	// 		token: env.SLACK_BOT_OAUTH_TOKEN,
	// 		user: userInfo.slack_id
	// 	})
	// });
	// const slackInfo = await slackInfoReq.json();
	// const slackProfile = await getSlackProfile(userInfo.slack_id)
	// console.log(slackProfile);

	redirect(302, '/');
};

async function verifyJWT(token: string): Promise<boolean> {
	const publicKeysUrl = 'https://auth.hackclub.com/oauth/discovery/keys';
	const publicKeys = await (await fetch(publicKeysUrl)).json();

	// jwt.verify(token)
	console.log(publicKeys);
	return false;
}
