<script context="module" lang="ts">
	import SubCardItem from './../../components/list-data/SubCardItem.svelte';
	import { scale } from 'svelte/transition';
	export type AccordionItemProps = {
		actor: {
			name: string;
			avatarSrc: string;
			alt?: string;
		};
		content: {
			title: string;
			description: string;
			readApproximately: number;
			tags: string[];
			category: string;
			imageSrc: string;
			createdAt: Date;
			imageAlt?: string;
		};
	};
</script>

<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Footer } from '$lib/components/ui/sheet';

	export let prop: AccordionItemProps = {
		actor: {
			name: 'Traiphakh Sitthikaew',
			alt: '@shad',
			avatarSrc: 'https://github.com/shadcn.png'
		},
		content: {
			title: 'It adheres to the WAI-ARIA design pattern',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy',
			readApproximately: 3,
			tags: ['svelte', 'ui', 'design'],
			category: 'Design',
			imageSrc: 'https://miro.medium.com/v2/0*MtwTqI-HM95Lr2SR.jpg',
			createdAt: new Date(),
			imageAlt: 'image-alt'
		}
	};
</script>

<Card.Root class="rounded-none  shadow-none border-0">
	<Card.Header>
		<Card.Title tag="h1">Engagement History</Card.Title>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<Card.Title class="font-normal" tag="h6">Subscribing</Card.Title>
		<div class="flex p-2 -space-x-1 overflow-hidden">
			{#each Array(7).fill(null) as item}
				<Avatar.Root class="transition ease-in-out hover:scale-110 cursor-pointer">
					<Avatar.Image src={prop.actor.avatarSrc} alt={prop.actor.alt ?? 'avatar-img'} />
					<Avatar.Fallback>{prop.actor.name[0].toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
			{/each}
		</div>
        <Separator />
	</Card.Content>
	<Card.Content id="author-list-item-section" class="flex flex-col gap-4">
		<Card.Title class="font-normal" tag="h6">Liked Contents</Card.Title>

		{#each Array(3).fill(null) as item}
			<SubCardItem />
		{/each}
	</Card.Content>
	<Card.Footer class="-mt-2">
		<Button size="sm" variant="link" class="bg-blue-100 text-blue-600">See more</Button>
	</Card.Footer>
</Card.Root>
