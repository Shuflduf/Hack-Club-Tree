import { client, getSlackId } from '$lib/server/lib';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies, request }) => {
	const slackId = await getSlackId(cookies.get('access_token') as string);
	const reqBody = await request.json();
	const toggleLikeSql = `
WITH existing AS (
  DELETE FROM likes
  WHERE slack_id = $1 AND liked_id = $2
  RETURNING *
),
inserted AS (
  INSERT INTO likes(slack_id, liked_id)
  SELECT $1, $2
  WHERE NOT EXISTS (SELECT 1 FROM existing)
  RETURNING *
)
SELECT EXISTS(SELECT 1 FROM inserted) as liked;
`;
	const values = [slackId, reqBody.likedId];
	const likedState = (await client.query(toggleLikeSql, values)).rows[0].liked;
	const likeCountSql = `
SELECT COUNT(*) as like_count
FROM likes
WHERE liked_id = $1;
	`;
	const likeCount = (await client.query(likeCountSql, [reqBody.likedId])).rows[0].like_count;
	// console.log(likedState, likeCount)

	return new Response(JSON.stringify({ liked: likedState, like_count: likeCount }));
};
