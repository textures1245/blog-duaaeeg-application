<script context="module" lang="ts">
	import ImageCard from './ImageCard.svelte';
	import { scale } from 'svelte/transition';
	import Icon from '@iconify/svelte';

	export type AccordionItemProps = {
		actor: {
			name: string;
			avatarSrc: string;
			alt?: string;
		};
		content: {
			uuid: string;
			title: string;
			description: string;
			readApproximately: number;
			tags: string[];
			category: string;
			interaction: {
				like: LikeModel[];
				comment: CommentModel[];
			};
			imageSrc?: string;
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
	import { capitalize, strLimiter } from '../utils/string';
	import type { CommentModel, LikeModel } from '$lib/internal/model/auth/domains/post';

	export let prop: AccordionItemProps = {
		actor: {
			name: 'Traiphakh Sitthikaew',
			alt: '@shad',
			avatarSrc: 'https://github.com/shadcn.png'
		},
		content: {
			uuid: '0',
			title: 'It adheres to the WAI-ARIA design pattern',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy',
			readApproximately: 3,
			tags: ['svelte', 'ui', 'design'],
			category: 'Design',
			imageSrc: 'https://miro.medium.com/v2/0*MtwTqI-HM95Lr2SR.jpg',
			createdAt: new Date(),
			imageAlt: 'image-alt',
			interaction: {
				like: [],
				comment: []
			}
		}
	};
</script>

<Accordion.Item value={prop.content.title}>
	<a href="/posts/{prop.content.uuid}" data-sveltekit-preload-data="tap">
		<Card.Root class="rounded-sm hover:bg-secondary cursor-pointer  shadow-none border-0">
			<Card.Header id="author-section">
				<div class="flex items-center gap-4">
					<Avatar.Root>
						<Avatar.Image src={prop.actor.avatarSrc} alt={prop.actor.alt ?? 'avatar-img'} />
						<Avatar.Fallback>{prop.actor.name[0].toUpperCase()}</Avatar.Fallback>
					</Avatar.Root>
					<Card.Title class="font-normal" tag="h4">{prop.actor.name}</Card.Title>
					|
					<Card.Title class="font-normal" tag="h5"
						>{prop.content.createdAt.toLocaleDateString('en-TH', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}</Card.Title
					>
					|
					<Card.Title class="font-normal flex gap-1" tag="h5">
						<Icon icon="material-symbols-light:thumb-up" />

						{prop.content.interaction.like.length}
					</Card.Title>
					<Card.Title class="font-normal flex gap-1" tag="h5">
						<Icon icon="material-symbols-light:comment" />

						{prop.content.interaction.comment.length}
					</Card.Title>
				</div>
			</Card.Header>
			<Card.Content id="content-section" class="grid gap-4 grid-cols-3">
				<div id="content" class="col-span-2 space-y-2">
					<Card.Title class="text-lg md:text-2xl" tag="h1"
						>{capitalize(prop.content.title)}</Card.Title
					>
					<Card.Description class="text-sm font-light md:text-base"
						>{strLimiter(prop.content.description)}</Card.Description
					>
				</div>
				{#if prop.content.imageSrc}
					<Card.Root class="w-40 place-self-center">
						<ImageCard
							width={16}
							height={16}
							imageSrc={prop.content.imageSrc}
							imageSrcAlt={prop.content.imageAlt ?? 'content-image'}
						/>
					</Card.Root>
				{/if}
			</Card.Content>
			<Card.Footer id="footer-section" class="flex text-lg  justify-between">
				<div id="tag-n-category" class="flex gap-4">
					<Badge variant="secondary">{capitalize(prop.content.category)}</Badge>
					<div class="flex items-center gap-2">
						{#each prop.content.tags as tag}
							<div class="font-light">{tag}</div>
							<Separator orientation="vertical" />
						{/each}
					</div>
				</div>
				<div id="action" class="flex gap-4">
					<span class="icon-[mdi--heart-outline]"></span>
					<span class="icon-[mdi--heart-outline]"></span>
				</div>
			</Card.Footer>
		</Card.Root>
	</a>
</Accordion.Item>
