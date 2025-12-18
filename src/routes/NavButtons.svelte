<script lang="ts">
	let {
		canGoOrn,
		goToHome,
		goToOrn
	}: { canGoOrn: boolean; goToHome: () => void; goToOrn: () => void } = $props();
</script>

<div>
	<button onclick={goToHome} class="secondary-button"
		><img src="https://icons.hackclub.com/api/icons/0xf8e9d3/home" alt="home" /></button
	>
	<button onclick={goToOrn} disabled={!canGoOrn} class="secondary-button"
		><img src="https://icons.hackclub.com/api/icons/0xf8e9d3/crosshairs" alt="ornament" /></button
	>
</div>

<style>
	div {
		position: fixed;
		right: 0;
		top: 0;
		padding: 20px;
		display: flex;
		gap: 16px;
		z-index: 20;
	}

	button:disabled {
		cursor: not-allowed;
	}
</style>
