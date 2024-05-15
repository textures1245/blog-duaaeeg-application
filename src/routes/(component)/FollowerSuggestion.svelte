<script context="module" lang="ts">
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

<Card.Root class="rounded-none shadow-none border-0">
	<Card.Header>
		<Card.Title tag="h1">Who to follow</Card.Title>
		<Card.Description>Base from kind of Authors you were followed</Card.Description>
	</Card.Header>
	{#each Array(5).fill(null) as item}
		<Card.Content id="author-list-item-section" class="grid gap-0 xl:gap-4 grid-cols-5">
			<Avatar.Root>
				<Avatar.Image src={prop.actor.avatarSrc} alt={prop.actor.alt ?? 'avatar-img'} />
				<Avatar.Fallback>{prop.actor.name[0].toUpperCase()}</Avatar.Fallback>
			</Avatar.Root>
			<div class="flex flex-col gap-4 col-span-3">
				<Card.Title class="font-normal" tag="h4">{prop.actor.name}</Card.Title>
				<Card.Description class="font-light text-gray-500"
					>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit distinctio...</Card.Description
				>
			</div>
			<div class="grid place-item-center">
				<Button class="bg-black text-white" size="sm">Subscribe</Button>
			</div>
		</Card.Content>
	{/each}
	<Card.Footer class="-mt-2">
		<Button size="sm" variant="link" class="bg-blue-100 text-blue-600">See more</Button>
	</Card.Footer>
</Card.Root>
