<script lang="ts">
	import './ornament_img.css';
	import { Decoration, DecorationFiles, type Ornament, type OrnamentConfig } from '$lib';
	import { onMount } from 'svelte';

	let { orn, placed }: { orn: Ornament; placed: boolean } = $props();
	let position = $derived(orn.ornament_position);
	let infoOpened = $state(false);

	let decorationUrl = $derived(DecorationFiles[orn.decoration_index as Decoration]);

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return `${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
		// return `${date.getDay()} ${date.toLocaleDateString}, ${date.getFullYear()}`
	}

	onMount(() => {
		// this is stupid but its fine
		document.addEventListener('mousedown', (ev: MouseEvent) => {
			infoOpened = false;
		});
	});
</script>

<div class="ornament" style={`top: ${position[1]}px; left: ${position[0]}px`}>
	<button class="no-button" onclick={() => (infoOpened = true)}>
		<img
			src={orn.pfp_url}
			draggable="false"
			class={`profile ${placed ? '' : 'pulsing'}`}
			alt="profile"
			style={`rotate: ${orn.rotation}deg; transform: scaleX(${orn.flipped ? -1 : 1})`}
		/>
	</button>
	{#if orn.decoration_index != 0}
		<img src={decorationUrl} class="overlay" alt="overlay" draggable="false" />
	{/if}
	{#if infoOpened}
		<div class="info">
			<a href={`https://hackclub.slack.com/team/${orn.slack_id}`}>{orn.username}</a>

			<div class="likes">
				<button>
					<img src="https://icons.hackclub.com/api/icons/0xf8e9d3/thumbsup-fill" alt="like" />
				</button>
				<p>42</p>
			</div>
			<div class="created-at">
				<span>Created at: {formatDate(orn.created_at)}</span>
				<span>Updated at: {formatDate(orn.updated_at)}</span>
			</div>
		</div>
	{/if}
</div>
