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
		const mouseX = event.clientX;
		const mouseY = event.clientY;

		const worldX = (mouseX - pagePosition[0]) / pageZoom;
		const worldY = (mouseY - pagePosition[1]) / pageZoom;

		const oldZoom = pageZoom;
		pageZoom += event.wheelDeltaY / 1000.0;
		pageZoom = Math.max(0.3, Math.min(5.0, pageZoom));

		pagePosition = [mouseX - worldX * pageZoom, mouseY - worldY * pageZoom];
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

	function confirmOrnament() {
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
			<button class="secondary-button" onclick={confirmOrnament}>
				<img src="https://icons.hackclub.com/api/icons/0xf8e9d3/checkmark" alt="confirm" />
			</button>
			<button class="secondary-button" onclick={cancelOrnament}>
				<img src="https://icons.hackclub.com/api/icons/0xf8e9d3/post-cancel" alt="cancel" />
			</button>
		{:else}
			<button class="secondary-button" onclick={newOrnament}>
				<img src="https://icons.hackclub.com/api/icons/0xf8e9d3/plus-fill" alt="new" />
			</button>
		{/if}
	{:else}
		<a href="https://auth.hackclub.com/oauth/authorize?{authParams}" class="login-button">Log In</a>
	{/if}
</div>

<div
	class="screen"
	style={`top: ${pagePosition[1]}px; left: ${pagePosition[0]}px; scale: ${pageZoom}`}
>
	<img src="tree.png" alt="tree" class="tree" draggable="false" />
	{#if draftOrnamentPosition != undefined}
		<Ornament placed={false} position={draftOrnamentPosition} src={profile.image_192} />
	{/if}
</div>
