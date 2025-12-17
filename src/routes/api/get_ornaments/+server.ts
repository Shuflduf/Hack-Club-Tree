import type { Ornamement } from '$lib';
import { client } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const sqlInstruction = `
SELECT * FROM users
  `;
	const res = await client.query(sqlInstruction);
	// console.log(res.rows);
	const ornaments: Ornamement[] = res.rows;
	return new Response(JSON.stringify(ornaments));
};
