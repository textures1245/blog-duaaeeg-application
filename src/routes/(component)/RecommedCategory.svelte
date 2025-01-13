<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';

	export let categories: string[] = ["Hiking", "Camping", "Travel", "Food", "Photography", "Music", "Art", "Fashion", "Technology", "Health"];
</script>

<Card.Root class="rounded-none shadow-none border-0">
	<Card.Header>
		<slot name="header">
			<Card.Title tag="h1">Recommend Category</Card.Title>
			<Card.Description>Blog recommend by great user like you.</Card.Description>
		</slot>
	</Card.Header>
	<Card.Content class="flex gap-4 flex-wrap">
		{#each categories as item, i (i)}
			<Button class="rounded-full" variant="secondary">{item}</Button>
		{/each}
	</Card.Content>
	<Card.Footer>
		<Button size="sm" variant="link" class="bg-blue-100 text-blue-600">See more</Button>
	</Card.Footer>
</Card.Root>
