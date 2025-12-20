<script lang="ts">
	import './ornament_img.css';
	import { Decoration, DecorationFiles, type Ornament, type OrnamentConfig } from '$lib';
	import { onMount } from 'svelte';

	let {
		orn,
		placed,
		updateOrn,
		errorHandler
	}: {
		orn: Ornament;
		placed: boolean;
		updateOrn: ((likedId: string, newLikeCount: number, isLiked: boolean) => void) | null;
		errorHandler: ((message: string) => void) | null;
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
			if (selfComponent && !selfComponent.contains(ev.target as Node)) {
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
				if (respBody.error) {
					errorHandler?.(respBody.error);
					liked = false;
					return;
				}
				const ornLikeCount = respBody.like_count;
				const ornLiked = respBody.liked;
				liked = ornLiked;
				updateOrn?.(orn.slack_id, ornLikeCount, ornLiked);
				disabled = false;
			})
		);
	}

	function openInfo() {
		if (!placed) {
			return;
		}
		infoOpened = true;
	}
</script>

<div
	class="ornament"
	style={`top: ${position[1]}px; left: ${position[0]}px`}
	bind:this={selfComponent}
>
	<button class="no-button" onclick={openInfo}>
		<img
			src={orn.pfp_url}
			draggable="false"
			class={`profile ${placed ? '' : 'pulsing'}`}
			alt="profile"
			style={`rotate: ${orn.rotation}deg; transform: scaleX(${orn.flipped ? -1 : 1}); height: ${50 + 2 * orn.likes}px`}
		/>
	</button>
	{#if orn.decoration_index != 0}
		<img
			src={decorationUrl}
			class="overlay"
			alt="overlay"
			draggable="false"
			style={`height: ${50 + 2 * orn.likes}px`}
		/>
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
				<span title={orn.created_at.toString()}>Created at: {formatDate(orn.created_at)}</span>
				<span title={orn.updated_at.toString()}>Updated at: {formatDate(orn.updated_at)}</span>
			</div>
		</div>
	{/if}
</div>
