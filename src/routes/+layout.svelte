<script lang="ts">
	import './global.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" />
	<title>HC Tree</title>
	<meta name="description" content="Place your profile picture on the tree to celebrate the December Holidays!"/>
</svelte:head>

{@render children()}
