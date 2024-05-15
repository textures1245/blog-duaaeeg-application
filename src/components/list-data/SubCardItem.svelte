<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import type { AccordionItemProps } from './AccordionItem.svelte';

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

<Card.Content class="space-y-2">
	<div class="flex items-center gap-2">
		<Avatar.Root>
			<Avatar.Image
				class="w-8 h-8"
				src={prop.actor.avatarSrc}
				alt={prop.actor.alt ?? 'avatar-img'}
			/>
			<Avatar.Fallback>{prop.actor.name[0].toUpperCase()}</Avatar.Fallback>
		</Avatar.Root>
		<Card.Title class="font-normal" tag="h6">{prop.actor.name}</Card.Title>
	</div>
	<Card.Title tag="h1">{prop.content.title}</Card.Title>
	<Card.Description class="font-normal"
		>{prop.content.createdAt.toLocaleDateString('en-TH', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})}</Card.Description
	>
</Card.Content>
