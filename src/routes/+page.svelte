<script lang="ts">
	import './styles.css';
	import Ornament from './Ornament.svelte';
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	type Position = [number, number];

	let { data }: PageProps = $props();
	let isAuthed = Object.keys(data).length !== 0;
	let profile = data;
	let pagePosition: Position = $state([0.0, 0.0]);
	let pageZoom = $state(1.0);
	let mousePos: Position = [0.0, 0.0];
	let mouseDown = false;
	let addingNewOrnament = $state(false);
	let movingNewOrnament = $state(false);
	let draftOrnamentPosition: undefined | Position = $state(undefined);
	// let screen: HTMLElement | undefined = $state()

	const authProps = {
		client_id: env.PUBLIC_HCA_CLIENT_ID,
		redirect_uri: env.PUBLIC_HCA_REDIRECT,
		response_type: 'code',
		scope: 'openid slack_id'
	};
	const authParams = new URLSearchParams(authProps).toString();

	onMount(() => {
		const screen = document.body;
		console.log(data);
		screen.addEventListener('mousedown', (event: MouseEvent) => {
			mouseDown = true;
			mousePos = [event.clientX - pagePosition[0], event.clientY - pagePosition[1]];
			if (movingNewOrnament) {
				movingNewOrnament = false;
			}
		});
		screen.addEventListener('mouseup', () => (mouseDown = false));
		screen.addEventListener('mousemove', mouseMove);
		screen.addEventListener('wheel', mouseWheel);
		screen.addEventListener('click', (event: MouseEvent) => {});
	});

	function mouseMove(event: MouseEvent) {
		if (mouseDown) {
			pagePosition = [event.clientX - mousePos[0], event.clientY - mousePos[1]];
		}
		if (movingNewOrnament) {
			draftOrnamentPosition = [
				(event.clientX - pagePosition[0]) / pageZoom,
				(event.clientY - pagePosition[1]) / pageZoom
			];
			console.log(draftOrnamentPosition);
		}
	}

	function mouseWheel(event: WheelEvent) {
		console.log(event.wheelDeltaY);
		pageZoom += event.wheelDeltaY / 1000.0;
		pageZoom = Math.max(0.5, Math.min(5.0, pageZoom));
	}

	async function newOrnament() {
		// const req = await fetch("/api/move_ornament", { method: "POST", body: JSON.stringify({position: mousePos}) })
		// const res = await req.json()
		// console.log(res)
		addingNewOrnament = true;
		movingNewOrnament = true;
		draftOrnamentPosition = undefined;
	}

	function cancelOrnament() {
		addingNewOrnament = false;
		draftOrnamentPosition = undefined;
	}

	function placeOrnament() {
		addingNewOrnament = false;
		console.log('PLACED ', draftOrnamentPosition);
	}
</script>

<div class="ui">
	{#if isAuthed}
		<div class="profile-card">
			<img src={profile.image_1024} alt="profile" />
			<h1>{profile.display_name}</h1>
		</div>
		{#if addingNewOrnament}
			<button onclick={placeOrnament}>CONFIRM</button>
			<button onclick={cancelOrnament}>CANCEL</button>
		{:else}
			<button onclick={newOrnament}>NEW</button>
		{/if}
	{:else}
		<a href="https://auth.hackclub.com/oauth/authorize?{authParams}" class="login-button">Log In</a>
	{/if}
</div>

<div
	class="screen"
	style={`top: ${pagePosition[1]}px; left: ${pagePosition[0]}px; scale: ${pageZoom}`}
>
	<img src="tree.png" alt="tree" draggable="false" />
	{#if draftOrnamentPosition != undefined}
		<Ornament
			placed={false}
			position={draftOrnamentPosition}
			src="https://avatars.slack-edge.com/2025-12-06/10094819889632_2e7e69699ad2fe3a7bdd_24.png"
		/>
	{/if}
</div>
