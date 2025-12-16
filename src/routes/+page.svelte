<script lang="ts">
	import "./styles.css"
	import Ornament from "./Ornament.svelte"
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
	let placingOrnament = $state(false)
	// let screen: HTMLElement | undefined = $state()

	const authProps = {
		client_id: env.PUBLIC_HCA_CLIENT_ID,
		redirect_uri: env.PUBLIC_HCA_REDIRECT,
		response_type: 'code',
		scope: 'openid slack_id'
	};
	const authParams = new URLSearchParams(authProps).toString();

	onMount(() => {
		const screen = document.body
		console.log(data);
		screen.addEventListener("mousedown", (event: MouseEvent) => {
			mouseDown = true;
			mousePos = [
				event.clientX - pagePosition[0],
				event.clientY - pagePosition[1]
			]
		});
		screen.addEventListener("mouseup", () => mouseDown = false);
		screen.addEventListener("mousemove", mouseMove);
		screen.addEventListener("wheel", mouseWheel)
	});

	function mouseMove(event: MouseEvent) {
		if (mouseDown) {
			pagePosition = [
				event.clientX - mousePos[0],
				event.clientY - mousePos[1]
			];
		}
	}

	function mouseWheel(event: WheelEvent) {
		console.log(event.wheelDeltaY)
		pageZoom += event.wheelDeltaY / 1000.0
		pageZoom = Math.max(0.5,Math.min(5.0,pageZoom))
	}

	async function addOrnament() {
		// const req = await fetch("/api/move_ornament", { method: "POST", body: JSON.stringify({position: mousePos}) })
		// const res = await req.json()
		// console.log(res)
		placingOrnament = true
	}
</script>

<div class="ui">
	{#if isAuthed}
		<div class="profile-card">
			<img src={profile.image_1024} alt="profile">
			<h1>{profile.display_name}</h1>
		</div>
		<button onclick={addOrnament}>olsakjdsiuj</button>
	{:else}
		<a href="https://auth.hackclub.com/oauth/authorize?{authParams}" class="login-button">Log In</a>
	{/if}
</div>

<div class="screen"
	style={`top: ${pagePosition[1]}px; left: ${pagePosition[0]}px; scale: ${pageZoom}`}
>
	<img
		src="tree.png"
		alt="tree"
		draggable="false"
	/>
	{#if placingOrnament}
		<Ornament placed={false} position={[300, 200]} src="https://avatars.slack-edge.com/2025-12-06/10094819889632_2e7e69699ad2fe3a7bdd_24.png" />
	{/if}
</div>

