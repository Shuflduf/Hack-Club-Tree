import { env } from '$env/dynamic/private';
import { client, getSingleOrnament, getSlackId } from '$lib/server/lib';
import type { RequestHandler } from './$types';

// TODO: call this every time a logged in user loads the page
export const POST: RequestHandler = async ({ cookies, request }) => {
	let access_token = cookies.get('access_token');
	if (!access_token) {
		return new Response(JSON.stringify({ error: 'Not logged in. Try Refreshing!' }));
	}
	const reqBody = await request.json();
	const slack_id = await getSlackId(access_token);
	const oldOrn = await getSingleOrnament(slack_id);
	if (oldOrn) {
		const cooldown: number | null = onCooldown(oldOrn.updated_at);
		if (cooldown != null) {
			return new Response(
				JSON.stringify({ error: `Wait ${cooldown} minutes before moving your ornament!` })
			);
		}
	}

	const profile = await getProfileInfo(slack_id);
	const ornamentPos = reqBody.position;
	const decorationIndex = reqBody.decoration;
	const rotation = reqBody.rotation;
	const flipped = reqBody.flipped;
	const ornamentPosStr = `(${ornamentPos[0]}, ${ornamentPos[1]})`;
	const sqlInstruction = `
INSERT INTO users(slack_id, username, pfp_url, ornament_position, updated_at, decoration_index, rotation, flipped)
VALUES($1, $2, $3, $4, $5, $6, $7, $8)
ON CONFLICT (slack_id)
DO UPDATE SET
	username = $2,
	pfp_url = $3,
	ornament_position = $4,
	updated_at = $5,
	decoration_index = $6,
	rotation = $7,
	flipped = $8
`;
	const values = [
		slack_id,
		profile.display_name,
		profile.image_192,
		ornamentPosStr,
		new Date().toISOString(),
		decorationIndex,
		rotation,
		flipped
	];
	const res = await client.query(sqlInstruction, values);
	console.log(slack_id);
	console.log(reqBody);
	console.log(profile);
	console.log(res);

	return new Response(JSON.stringify({ success: true }));
};

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

function onCooldown(originalTime: Date): number | null {
	console.log('NOW', new Date());
	console.log('OLD', originalTime);
	const now = new Date().getTime();
	const before = originalTime.getTime();

	const difference = now - before;
	const minuteCooldown = 30;
	const millisecondsCooldown = minuteCooldown * 60 * 1000;

	if (difference > millisecondsCooldown) {
		return null;
	} else {
		return Math.ceil(minuteCooldown - difference / 60 / 1000);
	}
}
