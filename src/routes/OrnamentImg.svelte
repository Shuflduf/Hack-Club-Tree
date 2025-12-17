<script lang="ts">
	import { DecorationFiles, type OrnamentConfig } from '$lib';

	let {
		position,
		placed,
		src,
		config
	}: { position: [number, number]; placed: boolean; src: string; config: OrnamentConfig } =
		$props();

	let decorationUrl = $derived(DecorationFiles[config.decoration]);
</script>

<div class="ornament" style={`top: ${position[1]}px; left: ${position[0]}px`}>
	<img
		{src}
		draggable="false"
		class={`profile ${placed ? '' : 'pulsing'}`}
		alt="profile"
		style={`rotate: ${config.rotation_degress}deg; transform: scaleX(${config.flipped ? -1 : 1})`}
	/>
	{#if config.decoration != 0}
		<img src={decorationUrl} class="overlay" alt="overlay" draggable="false" />
	{/if}
</div>

<style>
	img {
		user-select: none;
	}

	.ornament {
		position: absolute;
	}
	.profile {
		height: 50px;
		border-radius: 50%;
	}
	.overlay {
		position: absolute;
		height: 50px;
		left: -2px;
		top: 1px;
		scale: 1.55;
	}

	img.pulsing {
		animation: pulse 4s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			filter: brightness(1);
		}
		50% {
			filter: brightness(0.7);
		}
	}
</style>
