<script lang="ts">
	import { buttonVariants, Button } from '$lib/components/ui/button';

	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	import ImageCard from '../../../components/list-data/ImageCard.svelte';
	import { Link2, Pencil2 } from 'svelte-radix';
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'link' })}>Write</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Start Writing</Dialog.Title>
			<Dialog.Description>Pick option for start writing</Dialog.Description>
		</Dialog.Header>
		<div class="grid text-center grid-flow-col gap-4 py-4">
			<Card.Root class="hover:bg-secondary cursor-pointer grid place-items-center">
				<Card.Content>
					<Pencil2
						size="48"
						class="h-auto my-8 ease-in-out trasition  w-auto object-cover transition-all hover:scale-105 aspect-square"
					/>
				</Card.Content>
				<Card.Footer>
					<Card.Title>New Blog</Card.Title>
				</Card.Footer>
			</Card.Root>
			<Card.Root
				class="grid hover:bg-secondary cursor-pointer ease-in-out trasition place-items-center"
			>
				<Card.Content>
					<Link2
						size="48"
						class="h-auto my-8 w-auto object-cover transition-all hover:scale-105 aspect-square"
					/>
				</Card.Content>
				<Card.Footer>
					<Card.Title>Import File</Card.Title>
				</Card.Footer>
			</Card.Root>
		</div>
	</Dialog.Content>
</Dialog.Root>
