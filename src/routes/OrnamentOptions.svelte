<script lang="ts">
	import type { Decoration, OrnamentConfig } from '$lib';
	import { DecorationFiles } from '$lib';
	import { onMount } from 'svelte';
	import './ornament_options.css';

	let { pfpUrl, currentConfig }: { pfpUrl: string; currentConfig: OrnamentConfig } = $props();
	let currentDecoration = $state(0);
	let decorationUrl = $derived(DecorationFiles[currentDecoration as Decoration]);

	onMount(() => {});
</script>

<div class="background">
	<div class="menu">
		<form>
			<div class="question yellow">
				<h1>Transform</h1>
				<div class="spacer"></div>
				<div class="range-input">
					<img
						draggable="false"
						src="https://icons.hackclub.com/api/icons/0xf8e9d3/view-reload"
						alt="rotation"
					/>
					<input type="range" min="-180" max="180" step="20" />
				</div>
				<div class="checkbox-input">
					<img
						draggable="false"
						src="https://icons.hackclub.com/api/icons/0xf8e9d3/expand"
						alt="flip"
					/>
					<input type="checkbox" />
				</div>
				<div class="subtitle">Position related info</div>
			</div>

			<div class="question red">
				<h1>Decoration</h1>
				<div class="spacer"></div>
				<div class="image-radio">
					<label>
						<input
							type="radio"
							name="decoration-choice"
							value="0"
							defaultChecked={true}
							bind:group={currentDecoration}
						/>
					</label>
					<label>
						<input type="radio" name="decoration-choice" value="1" bind:group={currentDecoration} />
						<img src="overlays/01_neon.png" alt="Neon" />
					</label>

					<label>
						<input type="radio" name="decoration-choice" value="2" bind:group={currentDecoration} />
						<img src="overlays/02_hearts.png" alt="Hearts" />
					</label>

					<label>
						<input type="radio" name="decoration-choice" value="3" bind:group={currentDecoration} />
						<img src="overlays/03_snowman.png" alt="Snowman" />
					</label>
					<label>
						<input type="radio" name="decoration-choice" value="4" bind:group={currentDecoration} />
						<img src="overlays/04_jolly.png" alt="Jolly" />
					</label>
					<label>
						<input type="radio" name="decoration-choice" value="5" bind:group={currentDecoration} />
						<img src="overlays/05_lights.png" alt="Lights" />
					</label>
					<label>
						<input type="radio" name="decoration-choice" value="6" bind:group={currentDecoration} />
						<img src="overlays/06_gift.png" alt="Gift" />
					</label>
				</div>
				<div class="subtitle">Overlay that goes over your profile image</div>
			</div>
		</form>
		<div class="preview">
			<div class="image-and-overlay">
				{#if decorationUrl}
					<img src={decorationUrl} class="overlay" alt="overlay" />
				{/if}

				<img src={pfpUrl} class="profile" alt="profile" />
			</div>
		</div>
	</div>
</div>
