<script lang="ts">
	import { Decoration, type OrnamentConfig } from '$lib';
	import { DecorationFiles } from '$lib';
	import { onMount } from 'svelte';
	import './ornament_options.css';

	let { pfpUrl, finished }: { pfpUrl: string; finished: (newConf: OrnamentConfig) => void } =
		$props();
	let newConfig: OrnamentConfig = $state({
		decoration: Decoration.None,
		flipped: false,
		rotation_degress: 0
	});
	// let currentDecoration = $state(0)
	let decorationUrl = $derived(DecorationFiles[newConfig.decoration]);
	let open = $state(false);
	let oldConfig: OrnamentConfig;

	onMount(() => {});

	export function startEditing(config: OrnamentConfig) {
		oldConfig = structuredClone(config);
		newConfig = structuredClone(config);
		open = true;
	}

	function updateConfig() {
		open = false;
		finished(newConfig);
	}

	function cancelEditing() {
		open = false;
		finished(oldConfig);
	}
</script>

{#if open}
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
						<input
							type="range"
							min="-180"
							max="180"
							step="20"
							bind:value={newConfig.rotation_degress}
						/>
					</div>
					<div class="checkbox-input">
						<img
							draggable="false"
							src="https://icons.hackclub.com/api/icons/0xf8e9d3/expand"
							alt="flip"
						/>
						<input type="checkbox" bind:checked={newConfig.flipped} />
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
								bind:group={newConfig.decoration}
							/>
						</label>
						<label>
							<input
								type="radio"
								name="decoration-choice"
								value="1"
								bind:group={newConfig.decoration}
							/>
							<img src="overlays/01_neon.png" alt="Neon" />
						</label>

						<label>
							<input
								type="radio"
								name="decoration-choice"
								value="2"
								bind:group={newConfig.decoration}
							/>
							<img src="overlays/02_hearts.png" alt="Hearts" />
						</label>

						<label>
							<input
								type="radio"
								name="decoration-choice"
								value="3"
								bind:group={newConfig.decoration}
							/>
							<img src="overlays/03_snowman.png" alt="Snowman" />
						</label>
						<label>
							<input
								type="radio"
								name="decoration-choice"
								value="4"
								bind:group={newConfig.decoration}
							/>
							<img src="overlays/04_jolly.png" alt="Jolly" />
						</label>
						<label>
							<input
								type="radio"
								name="decoration-choice"
								value="5"
								bind:group={newConfig.decoration}
							/>
							<img src="overlays/05_lights.png" alt="Lights" />
						</label>
						<label>
							<input
								type="radio"
								name="decoration-choice"
								value="6"
								bind:group={newConfig.decoration}
							/>
							<img src="overlays/06_gift.png" alt="Gift" />
						</label>
					</div>
					<div class="subtitle">Overlay that goes over your profile image</div>
				</div>
			</form>
			<div class="preview">
				<div class="image-and-overlay">
					<img
						src={pfpUrl}
						class="profile"
						alt="profile"
						style={`rotate: ${newConfig.rotation_degress}deg; transform: scaleX(${newConfig.flipped ? -1 : 1})`}
					/>
					{#if decorationUrl}
						<img src={decorationUrl} class="overlay" alt="overlay" />
					{/if}
				</div>
				<div class="buttons">
					<button onclick={updateConfig} class="button-blue"
						><img src="https://icons.hackclub.com/api/icons/0xf8e9d3/edit" alt="update" /><span
							>Update</span
						></button
					>
					<button onclick={cancelEditing} class="button-red"
						><img
							src="https://icons.hackclub.com/api/icons/0xf8e9d3/view-close-small"
							alt="cancel"
						/><span>Cancel</span></button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
