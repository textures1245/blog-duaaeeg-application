<script lang="ts">
	import SubCardItem from './../../components/list-data/SubCardItem.svelte';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import type { AccordionItemProps } from '../../components/list-data/AccordionItem.svelte';

	export let config = {
		limit: 3
	};
	export let props: AccordionItemProps[] = [];
</script>

<Card.Root class="rounded-none shadow-none border-0">
	<Card.Header>
		<slot name="header">
			<Card.Title tag="h1">Trend Picks</Card.Title>
			<Card.Description>Blog recommend by great user like you.</Card.Description>
		</slot>
	</Card.Header>
	<Card.Content>
		{#each props.slice(0, config.limit) as item, i (i)}
			<SubCardItem prop={item} />
		{/each}
	</Card.Content>
	<Card.Footer class="-mt-2">
		<Button size="sm" variant="link" class="bg-blue-100 text-blue-600">See more</Button>
	</Card.Footer>
</Card.Root>
