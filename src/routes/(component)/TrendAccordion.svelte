<script lang="ts">
	import SubCardItem from './../../components/list-data/SubCardItem.svelte';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<Card.Root class="rounded-none shadow-none border-0">
	<Card.Header>
		<Card.Title tag="h1">Trend Picks</Card.Title>
		<Card.Description>Blog recommend by great user like you.</Card.Description>
	</Card.Header>
	<Card.Content>
		{#each Array(3).fill(null) as item, i}
			<SubCardItem />
		{/each}
	</Card.Content>
	<Card.Footer class="-mt-2">
		<Button size="sm" variant="link" class="bg-blue-100 text-blue-600">See more</Button>
	</Card.Footer>
</Card.Root>
