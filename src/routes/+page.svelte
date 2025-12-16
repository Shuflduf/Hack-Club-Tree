<script lang="ts">
	import "./styles.css"
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let isAuthed = Object.keys(data).length !== 0;
	let profile = data;

	const authProps = {
		client_id: env.PUBLIC_HCA_CLIENT_ID,
		redirect_uri: env.PUBLIC_HCA_REDIRECT,
		response_type: 'code',
		scope: 'openid slack_id'
	};
	const authParams = new URLSearchParams(authProps).toString();

	onMount(() => {
		console.log(data);
	});
</script>

{#if isAuthed}
	<div class="profile-card">
	<img src={profile.image_1024} alt="profile">
	<h1>{profile.display_name}</h1>
	</div>
{:else}
	<a href="https://auth.hackclub.com/oauth/authorize?{authParams}">auth</a>
{/if}

<img
	src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAB5uGmUgiogA3EznAhwHRX1B4_2_PtOjmcw&s"
	alt="tree"
/>
