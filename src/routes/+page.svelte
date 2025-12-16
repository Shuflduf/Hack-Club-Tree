<script lang="ts">
	import "./styles.css"
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let isAuthed = Object.keys(data).length !== 0;
	let profile = data;
	let pagePosition = $state([0.0, 0.0])
	let pageZoom = $state(1.0)
	let mousePos = [0.0, 0.0]
	let mouseDown = false

	const authProps = {
		client_id: env.PUBLIC_HCA_CLIENT_ID,
		redirect_uri: env.PUBLIC_HCA_REDIRECT,
		response_type: 'code',
		scope: 'openid slack_id'
	};
	const authParams = new URLSearchParams(authProps).toString();

	onMount(() => {
		console.log(data);
		window.addEventListener("mousedown", (event: MouseEvent) => {
			mouseDown = true;
			mousePos = [
				event.clientX - pagePosition[0],
				event.clientY - pagePosition[1]
			]
		})
		window.addEventListener("mouseup", () => mouseDown = false)
		window.addEventListener("mousemove", mouseMove)
	});

	function mouseMove(event: MouseEvent) {
		if (mouseDown) {
			pagePosition = [
				event.clientX - mousePos[0],
				event.clientY - mousePos[1]
			];
			console.log(mousePos);
		}

	}
</script>

{#if isAuthed}
	<div class="profile-card">
		<img src={profile.image_1024} alt="profile">
		<h1>{profile.display_name}</h1>
	</div>
{:else}
	<a href="https://auth.hackclub.com/oauth/authorize?{authParams}" class="login-button">Log In</a>
{/if}

<div class="screen">
	<img
		src="tree.png"
		alt="tree"
		style={`top: ${pagePosition[1]}px; left: ${pagePosition[0]}px;`}
		draggable="false"
	/>
</div>
