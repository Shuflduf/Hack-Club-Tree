<script lang="ts">
	let messages: string[] = $state([]);

	export function spawnMessage(message: string) {
		messages.push(message);
		setTimeout(() => messages.shift(), 2000);
	}
</script>

<div>
	{#each messages as msg}
		<p>
			{msg}
		</p>
	{/each}
</div>

<style>
	div {
		position: fixed;
		bottom: 0;
		z-index: 20;
		padding: 10px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	p {
		margin: 0;
		border-radius: 10px;
		color: #f8e9d3;
		font-size: 1.25rem;
		font-family: 'Jua';
		padding: 8px 24px;
		background-color: #7b4942;
		border: 4px solid #ad7858;
	}
</style>
