<script lang="ts">
	import './ornament_img.css';
	import { Decoration, DecorationFiles, type Ornament, type OrnamentConfig } from '$lib';

	// let {

	// 	position,
	// 	placed,
	// 	src,
	// 	config,
	// 	display_name,
	// 	slack_id
	// }: {
	// 	position: [number, number];
	// 	placed: boolean;
	// 	src: string;
	// 	config: OrnamentConfig;
	// 	display_name: string;
	// 	slack_id: string;
	// } = $props();
	let { orn, placed }: { orn: Ornament; placed: boolean } = $props();
	let position = $derived(orn.ornament_position);

	let decorationUrl = $derived(DecorationFiles[orn.decoration_index as Decoration]);
</script>

<div class="ornament" style={`top: ${position[1]}px; left: ${position[0]}px`}>
	<img
		src={orn.pfp_url}
		draggable="false"
		class={`profile ${placed ? '' : 'pulsing'}`}
		alt="profile"
		style={`rotate: ${orn.rotation}deg; transform: scaleX(${orn.flipped ? -1 : 1})`}
	/>
	{#if orn.decoration_index != 0}
		<img src={decorationUrl} class="overlay" alt="overlay" draggable="false" />
	{/if}
	<div class="info">
		<a href={`https://hackclub.slack.com/team/${orn.slack_id}`}>{orn.slack_id}</a>

		<div class="likes">
			<button>
				<img src="https://icons.hackclub.com/api/icons/0xf8e9d3/thumbsup-fill" alt="like" />
			</button>
			<span>42</span>
		</div>
		<div class="created-at">
			<img src="https://icons.hackclub.com/api/icons/0xf8e9d3/clock-fill" alt="created at" />
			<span>{orn.created_at}</span>
		</div>
	</div>
</div>
