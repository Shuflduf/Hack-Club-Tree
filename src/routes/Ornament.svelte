<script lang="ts">
	let { position, placed, src }: { position: [number, number]; placed: boolean; src: string } =
		$props();
</script>

<img
	{src}
	draggable="false"
	alt="ornament"
	class={placed ? "" : "pulsing"}
	style={`top: ${position[1]}px; left: ${position[0]}px`}
/>

<style>
	img {
		height: 50px;
		position: absolute;
		user-select: none;
	}

	img.pulsing {
		animation: pulse 4s infinite;
	}

	@keyframes pulse {
		0%, 100% {
			filter: brightness(1);
		}
		50% {
			filter: brightness(0.7);
		}
	}
</style>
