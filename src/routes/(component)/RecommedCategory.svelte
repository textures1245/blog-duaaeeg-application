<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<Card.Root class="rounded-none shadow-none border-0">
	<Card.Header>
		<Card.Title tag="h1">Recommend Category</Card.Title>
		<Card.Description>Blog recommend by great user like you.</Card.Description>
	</Card.Header>
	<Card.Content class="flex gap-4 flex-wrap">
		{#each Array(10).fill(null) as item, i}
			<Badge class="!bg-slate-500 rounded-full p-3 px-5">Hiking</Badge>
		{/each}
	</Card.Content>
	<Card.Footer class="-mt-2">
		<Button size="sm" variant="link" class="bg-blue-100 text-blue-600">See more</Button>
	</Card.Footer>
</Card.Root>
