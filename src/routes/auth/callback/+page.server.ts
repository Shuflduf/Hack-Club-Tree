import { env } from '$env/dynamic/private';
import { env as penv } from '$env/dynamic/public';

import type { PageServerLoad } from './$types';

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
	console.log(reqParams);
	const req = await fetch(authTokenUrl, {
		method: 'POST',
		body: new URLSearchParams(reqParams as any)
	});
	const response = await req.json();
	console.log(response);

	cookies.set('access_token', response.access_token, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 3600
	});

	const userInfoUrl = 'https://auth.hackclub.com/oauth/userinfo';
	const userInfoReq = await fetch(userInfoUrl, {
		headers: {
			Authorization: `Bearer ${response.access_token}`
		}
	});
	console.log(await userInfoReq.json());

	return { success: true };
};

async function verifyJWT(token: string): Promise<boolean> {
	const publicKeysUrl = 'https://auth.hackclub.com/oauth/discovery/keys';
	const publicKeys = await (await fetch(publicKeysUrl)).json();

	// jwt.verify(token)
	console.log(publicKeys);
	return false;
}
