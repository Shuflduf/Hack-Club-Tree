<script lang="ts">
	import { onMount } from 'svelte';

	let { data } = $props();

	onMount(() => {
		console.log(data);
		// const accessToken = data["access_token"]
		// document.cookie = `access_token=${accessToken} .; path=/; max-age=3600; SameSite=Strict`;
		// const reqUrl = "https://auth.hackclub.com/oauth/userinfo"
	});
</script>
