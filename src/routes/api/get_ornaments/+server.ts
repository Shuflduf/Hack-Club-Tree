import type { Ornament } from '$lib';
import { client, getSlackId } from '$lib/server/lib';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	let slackId = null;
	let access_token = cookies.get('access_token');
	if (access_token) {
		slackId = await getSlackId(access_token);
	}
	const sqlInstruction = slackId
		? `
SELECT 
  u.*, 
  COUNT(l.slack_id) as likes,
  EXISTS(
    SELECT 1 FROM likes 
    WHERE slack_id = $1 AND liked_id = u.slack_id
  ) as has_been_liked
FROM users u
LEFT JOIN likes l ON u.slack_id = l.liked_id
GROUP BY u.slack_id;
`
		: `
SELECT u.*, COUNT(l.slack_id) as likes
FROM users u
LEFT JOIN likes l ON u.slack_id = l.liked_id
GROUP BY u.slack_id;
`;
	const res = await (slackId
		? client.query(sqlInstruction, [slackId])
		: client.query(sqlInstruction));
	console.log(res.rows);
	const ornaments: Ornament[] = res.rows.map((row) => {
		row.ornament_position = [row.ornament_position.x, row.ornament_position.y];
		return row;
	});
	return new Response(JSON.stringify(ornaments));
};
