<script lang="ts">
	import { onMount } from 'svelte';

	let { data } = $props();

	onMount(() => {
		console.log(data);
	});
</script>

<p>{data.success}</p>
