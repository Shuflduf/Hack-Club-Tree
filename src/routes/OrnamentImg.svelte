<script lang="ts">
	import './ornament_img.css';
	import { Decoration, DecorationFiles, type Ornament, type OrnamentConfig } from '$lib';
	import { onMount } from 'svelte';

	let {
		orn,
		placed,
		updateOrn
	}: {
		orn: Ornament;
		placed: boolean;
		updateOrn: ((likedId: string, newLikeCount: number, isLiked: boolean) => void) | null;
	} = $props();
	let position = $derived(orn.ornament_position);
	let infoOpened = $state(false);
	let selfComponent: any = $state();
	let liked = $state(orn.has_been_liked);
	let disabled = $state(false);

	let decorationUrl = $derived(DecorationFiles[orn.decoration_index as Decoration]);

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return `${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
	}

	onMount(() => {
		document.addEventListener('mousedown', (ev: MouseEvent) => {
			if (!selfComponent.contains(ev.target)) {
				infoOpened = false;
			}
		});
	});

	function handleLikePress() {
		if (disabled) {
			return;
		}
		disabled = true;
		liked = !liked;
		fetch('/api/toggle_like', {
			method: 'POST',
			body: JSON.stringify({
				likedId: orn.slack_id
			})
		}).then((r) =>
			r.json().then((respBody) => {
				const ornLikeCount = respBody.like_count;
				const ornLiked = respBody.liked == 'true';
				updateOrn?.(orn.slack_id, ornLikeCount, ornLiked);
				//  const likedPost = respBody.liked == "true";
				//  liked = likedPost
				// console.log(likedPost)
				disabled = false;
			})
		);
	}
</script>

<div
	class="ornament"
	style={`top: ${position[1]}px; left: ${position[0]}px`}
	bind:this={selfComponent}
>
	<button class="no-button" onclick={() => (infoOpened = true)}>
		<img
			src={orn.pfp_url}
			draggable="false"
			class={`profile ${placed ? '' : 'pulsing'}`}
			alt="profile"
			style={`rotate: ${orn.rotation}deg; transform: scaleX(${orn.flipped ? -1 : 1})`}
		/>
	</button>
	{#if orn.decoration_index != 0}
		<img src={decorationUrl} class="overlay" alt="overlay" draggable="false" />
	{/if}
	{#if infoOpened}
		<div class="info">
			<a href={`https://hackclub.slack.com/team/${orn.slack_id}`}>{orn.username}</a>

			<div class="likes">
				<button {disabled} onclick={handleLikePress}>
					<img
						src={`https://icons.hackclub.com/api/icons/0xf8e9d3/${liked ? 'thumbsup-fill' : 'thumbsup'}`}
						alt="like"
					/>
				</button>
				<p>{orn.likes}</p>
			</div>
			<div class="created-at">
				<span>Created at: {formatDate(orn.created_at)}</span>
				<span>Updated at: {formatDate(orn.updated_at)}</span>
			</div>
		</div>
	{/if}
</div>
