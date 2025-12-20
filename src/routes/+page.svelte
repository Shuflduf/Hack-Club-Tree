<script lang="ts">
	import './styles.css';
	import Errors from './Errors.svelte';
	import OrnamentImg from './OrnamentImg.svelte';
	import NavButtons from './NavButtons.svelte';
	import OrnamentOptions from './OrnamentOptions.svelte';
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import { Decoration, type Ornament, type OrnamentConfig } from '$lib';
	import { fly } from 'svelte/transition';

	type Position = [number, number];

	let ornamentOptionsMenu: any = $state();
	let errorHandler: any = $state();
	let background: any = $state();

	let { data }: PageProps = $props();
	let ornaments: Ornament[] = $state([]);
	let isAuthed = Object.keys(data).length !== 0;
	let profile = data.profile;
	let slackId = data.slack_id;
	let pagePosition: Position = $state([0.0, 0.0]);
	let pageZoom = $state(1.0);
	let mousePos: Position = [0.0, 0.0];
	let mouseDown = false;
	let addingNewOrnament = $state(false);
	let movingNewOrnament = $state(false);
	let draftOrnamentPosition: undefined | Position = $state(undefined);
	let currentConfig: OrnamentConfig = $state({
		decoration: Decoration.None,
		flipped: false,
		rotation_degress: 0
	});
	let currentOrnPosition: Position | null = $state(null);
	let configMenuOpened = $state(false);

	$effect(() => {
		if (background) {
			const viewportCenterX = window.innerWidth / 2;
			const viewportCenterY = window.innerHeight / 2;

			const imageCenterX = 1500;
			const imageCenterY = 1500;

			const offsetX = pagePosition[0] + (viewportCenterX - imageCenterX * pageZoom * 4.0);
			const offsetY = pagePosition[1] + (viewportCenterY - imageCenterY * pageZoom * 4.0);

			background.style.backgroundPosition = `${offsetX * 0.3}px ${offsetY * 0.3}px`;
			background.style.backgroundSize = `${pageZoom * 3000}px`;
			// background.style.backgroundPosition = `${pagePosition[0] * 0.3}px ${pagePosition[1] * 0.3}px`;
			// background.style.backgroundSize = `${pageZoom * 3000}px`;
		}
	});
	// let screen: HTMLElement | undefined = $state()

	const authProps = {
		client_id: env.PUBLIC_HCA_CLIENT_ID,
		redirect_uri: env.PUBLIC_HCA_REDIRECT,
		response_type: 'code',
		scope: 'openid slack_id'
	};
	const authParams = new URLSearchParams(authProps).toString();

	onMount(() => {
		goToHome();
		reload();
		background = document.documentElement;
		const screen = document.body;
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
			const targetPosition: [number, number] = [
				(event.clientX - pagePosition[0]) / pageZoom - 25,
				(event.clientY - pagePosition[1]) / pageZoom - 25
			];
			if (
				targetPosition[0] < 0 ||
				targetPosition[0] > 2000 ||
				targetPosition[1] < 0 ||
				targetPosition[1] > 2300
			) {
				return;
			}
			draftOrnamentPosition = targetPosition;
		}
	}

	function mouseWheel(event: WheelEvent) {
		const mouseX = event.clientX;
		const mouseY = event.clientY;

		const worldX = (mouseX - pagePosition[0]) / pageZoom;
		const worldY = (mouseY - pagePosition[1]) / pageZoom;

		pageZoom += event.wheelDeltaY / 1000.0;
		pageZoom = Math.max(0.3, Math.min(5.0, pageZoom));

		pagePosition = [mouseX - worldX * pageZoom, mouseY - worldY * pageZoom];
	}

	async function newOrnament() {
		addingNewOrnament = true;
		movingNewOrnament = true;
		draftOrnamentPosition = undefined;
	}

	function cancelOrnament() {
		addingNewOrnament = false;
		draftOrnamentPosition = undefined;
	}

	function replaceOrn(targetSlackId: string, newOrn: Ornament) {
		ornaments = ornaments.map((orn) => (orn.slack_id == targetSlackId ? newOrn : orn));
	}

	async function confirmOrnament() {
		if (draftOrnamentPosition == undefined) {
			return;
		}
		const pos: Position = [
			Math.round(draftOrnamentPosition[0]),
			Math.round(draftOrnamentPosition[1])
		];
		currentOrnPosition = pos;
		let oldOrn: Ornament | undefined = ornaments.find((orn) => orn.slack_id == slackId);
		let newOrn: Ornament = {
			created_at: new Date(),
			has_been_liked: false,
			likes: 0,
			pfp_url: profile.image_192,
			slack_id: slackId,
			username: profile.display_name,
			ornament_position: pos,
			decoration_index: currentConfig.decoration,
			rotation: currentConfig.rotation_degress,
			flipped: currentConfig.flipped,
			updated_at: new Date()
		};
		let backupOrn: Ornament | null = null;
		if (oldOrn) {
			backupOrn = $state.snapshot(oldOrn);
			replaceOrn(slackId, {
				...oldOrn,
				ornament_position: newOrn.ornament_position,
				decoration_index: newOrn.decoration_index,
				rotation: newOrn.rotation,
				flipped: newOrn.flipped,
				updated_at: newOrn.updated_at
			});
		} else {
			ornaments.push(newOrn);
		}
		draftOrnamentPosition = undefined;

		addingNewOrnament = false;
		const res = await fetch('/api/move_ornament', {
			method: 'POST',
			body: JSON.stringify({
				position: pos,
				flipped: currentConfig.flipped,
				rotation: currentConfig.rotation_degress,
				decoration: currentConfig.decoration
			})
		});
		currentOrnPosition = pos;
		const respBody = await res.json();
		if (respBody.error) {
			recievedError(respBody.error);
			if (backupOrn) {
				replaceOrn(slackId, backupOrn);
				currentOrnPosition = backupOrn.ornament_position;
			} else {
				currentOrnPosition = null;
			}
		}

		draftOrnamentPosition = undefined;
	}

	function openOrnamentOptions() {
		configMenuOpened = true;
		ornamentOptionsMenu.startEditing($state.snapshot(currentConfig));
	}

	function updateExistingConfig(newConfig: OrnamentConfig) {
		console.log(newConfig);
		currentConfig = newConfig;
	}

	function updateOrn(likedId: string, newLikeCount: number, isLiked: boolean) {
		const targetIndex = ornaments.findIndex((orn) => orn.slack_id == likedId);
		ornaments[targetIndex].likes = newLikeCount;
		ornaments[targetIndex].has_been_liked = isLiked;
		ornaments = ornaments;
	}

	function recievedError(message: string) {
		errorHandler.spawnMessage(message);
	}

	function goToHome() {
		const viewportCenterX = window.innerWidth / 2;
		const viewportCenterY = window.innerHeight / 2;

		const treeCenterX = 2784 / 2;
		const treeCenterY = 3204 / 2;

		pageZoom = 0.3;
		pagePosition = [
			viewportCenterX - treeCenterX * pageZoom + 100,
			viewportCenterY - treeCenterY * pageZoom + 150
		];
	}

	function goToOrn() {
		if (!currentOrnPosition) {
			return;
		}
		const viewportCenterX = window.innerWidth / 2;
		const viewportCenterY = window.innerHeight / 2;

		const ornCenter = 170 / 2;

		pageZoom = 2;
		pagePosition = [
			-currentOrnPosition[0] * pageZoom + viewportCenterX - ornCenter,
			-currentOrnPosition[1] * pageZoom + viewportCenterY - ornCenter
		];
	}

	function reload() {
		currentOrnPosition = null;
		ornaments = [];
		fetch('/api/get_ornaments').then((c) =>
			c.json().then((b) => {
				ornaments = b;
				const myOrn = ornaments.find((orn) => orn.slack_id == slackId);
				if (myOrn) {
					currentOrnPosition = myOrn.ornament_position;
				}
			})
		);
	}
</script>

{#if isAuthed}
	<OrnamentOptions
		pfpUrl={profile.image_512}
		bind:this={ornamentOptionsMenu}
		finished={updateExistingConfig}
	/>
{/if}

<Errors bind:this={errorHandler} />

<NavButtons canGoOrn={currentOrnPosition != null} {goToHome} {goToOrn} {reload} />

<div class="ui">
	{#if isAuthed}
		<div class="profile-card">
			<img src={profile.image_512} alt="profile" />
			<a href="/signout" title="Click to sign out">{profile.display_name}</a>
		</div>
		{#if addingNewOrnament}
			<button class="secondary-button" onclick={confirmOrnament} title="Place Ornament">
				{#if configMenuOpened}
					<img
						src="https://icons.hackclub.com/api/icons/0xbe4b53/important-fill"
						class="indicator"
						alt="indicator"
					/>
				{/if}
				<img src="https://icons.hackclub.com/api/icons/0xf8e9d3/checkmark" alt="confirm" />
			</button>
			<button class="secondary-button" onclick={cancelOrnament} title="Cancel Placement">
				<img src="https://icons.hackclub.com/api/icons/0xf8e9d3/view-close-small" alt="cancel" />
			</button>
			<button class="secondary-button" onclick={openOrnamentOptions} title="Open Configuration">
				{#if !configMenuOpened}
					<img
						src="https://icons.hackclub.com/api/icons/0xbe4b53/important-fill"
						class="indicator"
						alt="indicator"
					/>
				{/if}
				<img src="https://icons.hackclub.com/api/icons/0xf8e9d3/controls" alt="options" />
			</button>
		{:else}
			<button class="secondary-button" onclick={newOrnament} title="Add your Ornament">
				{#if currentOrnPosition == null}
					<img
						src="https://icons.hackclub.com/api/icons/0xbe4b53/important-fill"
						class="indicator"
						alt="indicator"
					/>
				{/if}
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
		<OrnamentImg
			placed={false}
			orn={{
				slack_id: slackId,
				username: profile.display_name,
				pfp_url: profile.image_192,
				likes: 0,
				has_been_liked: false,
				ornament_position: draftOrnamentPosition,
				decoration_index: currentConfig.decoration,
				flipped: currentConfig.flipped,
				rotation: currentConfig.rotation_degress,
				updated_at: new Date(),
				created_at: new Date()
			}}
			updateOrn={null}
			errorHandler={null}
		/>
	{/if}

	{#each ornaments as orn}
		{#if orn.slack_id != slackId || !addingNewOrnament}
			<OrnamentImg placed={true} {orn} {updateOrn} errorHandler={recievedError} />
		{/if}
	{/each}
</div>
