<script lang="ts">
	let { position, placed, src }: { position: [number, number]; placed: boolean; src: string } =
		$props();
</script>

<img
	{src}
	draggable="false"
	alt="ornament"
	style={`top: ${position[1]}px; left: ${position[0]}px`}
/>

<style>
	img {
		height: 50px;
		position: absolute;
		user-select: none;
	}
</style>
