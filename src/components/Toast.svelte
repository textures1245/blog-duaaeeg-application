<script>
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	export let status = 'Status';
	export let msg = 'Message';
	export let durationSec = 5;
	export let classList = '';

	let show = true;

	onMount(() => {
		setTimeout(() => {
			show = false;
		}, durationSec * 1000);
	});
</script>

{#if show}
	<div
		transition:fade={{ duration: 300 }}
		class="fixed animate-opacity z-10 right-0 top-0 mt-12 mr-12"
	>
		<div class="max-w-80 w-60 h-full">
			<Card.Root class="grid {classList}">
				<Card.Header>
					<Card.Title>{status}</Card.Title>
					<Card.Description>{msg}</Card.Description>
				</Card.Header>
			</Card.Root>
		</div>
	</div>
{/if}
