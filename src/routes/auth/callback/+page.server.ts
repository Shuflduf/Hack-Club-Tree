import { env } from "$env/dynamic/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  console.log(params.code)
  const authTokenUrl = "https://auth.hackclub.com/oauth/token"
  const reqParams = {
      client_id: env.PUBLIC_HCA_CLIENT_ID,
      client_secret: env.HCA_CLIENT_SECRET,
      redirect_uri: env.PUBLIC_HCA_REDIRECT,
      code: params.code,
      grant_type: "authorization_code",
    };
    console.log(reqParams)
  const req = await fetch(authTokenUrl, {
    method: "POST",
    body: reqParams,
  })
  const response = await req.json()
  console.log(response);

  return response;
}
