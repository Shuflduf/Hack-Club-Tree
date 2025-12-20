<script lang="ts">
	let {
		canGoOrn,
		goToHome,
		goToOrn,
		reload
	}: { canGoOrn: boolean; goToHome: () => void; goToOrn: () => void; reload: () => void } =
		$props();
</script>

<div>
	<button onclick={reload} class="secondary-button" title="Reload Ornaments">
		<img src="https://icons.hackclub.com/api/icons/0xf8e9d3/view-reload" alt="reload" />
	</button>
	<button onclick={goToHome} class="secondary-button" title="Focus on Tree">
		<img src="https://icons.hackclub.com/api/icons/0xf8e9d3/home" alt="home" />
	</button>
	<button onclick={goToOrn} disabled={!canGoOrn} class="secondary-button" title="Focus on Yourself">
		<img src="https://icons.hackclub.com/api/icons/0xf8e9d3/crosshairs" alt="ornament" />
	</button>
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
