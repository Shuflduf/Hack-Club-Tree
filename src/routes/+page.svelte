<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';

	let authObject = {
		client_id: env.PUBLIC_HCA_CLIENT_ID,
		redirect_uri: env.PUBLIC_HCA_REDIRECT,
		response_type: 'code',
		scope: 'openid profile slack_id'
	};
	let authParams = new URLSearchParams(authObject).toString();

	onMount(() => {
		console.log(authParams);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<a href="https://auth.hackclub.com/oauth/authorize?{authParams}">auth</a>
<img
	src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAB5uGmUgiogA3EznAhwHRX1B4_2_PtOjmcw&s"
	alt="tree"
/>

<p>
	https://auth.hackclub.com/oauth/authorize?client_id=your_client_id&redirect_uri=https%3A%2F%2Farcade.hackclub.com%2Fauth%2Fcallback&response_type=code&scope=openid+profile+email
</p>
