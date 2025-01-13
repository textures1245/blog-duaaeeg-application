<script lang="ts">
	import ImageCard from './../../../components/list-data/ImageCard.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import type { PostResDat } from '$lib/internal/model/auth/domains/post';
	import type { AccordionItemProps } from '../../../components/list-data/AccordionItem.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import { capitalize } from '../../../components/utils/string';
	import Icon from '@iconify/svelte';

	export let post: AccordionItemProps = {
		actor: {
			name: 'Traiphakh Sitthikaew',
			alt: '@shad',
			avatarSrc: 'https://github.com/shadcn.png'
		},
		content: {
			uuid: '0',
			title: 'It adheres to the WAI-ARIA design pattern',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummyLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummyLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummyLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy',
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

	// onMount(() => {
	// 	const data = get(page).data;
	// 	post = data.post;
	// });
</script>

<main class="container mx-auto py-8">
	<article class="prose -space-y-4 lg:prose-xl mx-auto">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{post.content.title}</h1>
		<div class="flex items-center">
			<img
				class="w-12 h-12 rounded-full mr-4"
				src={post.actor.avatarSrc}
				alt="Author's profile picture"
			/>
			<div class="flex w-full items-center justify-between">
				<div class="-space-y-4">
					<p class="text-lg md:text-xl font-semibold">
						{post.actor.name}
					</p>
					<p class="text-base md:text-lg text-gray-600">
						{new Date(post.content.createdAt.toLocaleDateString('EN', {
							dateStyle: 'long',
						})).toDateString()}
					</p>
				</div>
				<div class="">
					<Card.Title class="font-normal flex gap-1" tag="h3">
						<Icon
							class="hover:scale-110 cursor-pointer transition-all"
							icon="material-symbols-light:thumb-up"
						/>

						{post.content.interaction.like.length}
					</Card.Title>
					<Card.Title class="font-normal flex gap-1" tag="h3">
						<Icon
							class="hover:scale-110 cursor-pointer transition-all"
							icon="material-symbols-light:comment"
						/>

						{post.content.interaction.comment.length}
					</Card.Title>
				</div>
			</div>
		</div>
		<div class="">
			<hr class="my-10" />
			<div id="tag-section" class="flex text-xl md:text-2xl justify-between">
				<div id="tag-n-category" class="flex flex-wrap justify-center gap-y-6 gap-x-12">
					<Badge class="scale-150" variant="secondary">{capitalize(post.content.category)}</Badge>
					<div class="flex items-center gap-4">
						{#each post.content.tags as tag}
							<div class="font-light">{tag}</div>
							<Separator orientation="vertical" />
						{/each}
					</div>
				</div>
				<div id="action" class="flex gap-4">
					<span class="icon-[mdi--heart-outline]"></span>
					<span class="icon-[mdi--heart-outline]"></span>
				</div>
			</div>
		</div>
		<div class="">
			{#if post.content.imageSrc}
				<figure class="grid place-items-center">
					<ImageCard
						width={36}
						height={36}
						imageSrc={post.content.imageSrc}
						imageSrcAlt={post.content.imageAlt ?? 'content-image'}
					/>
				</figure>
			{/if}
		</div>
		<section id="content" class="font-light py-10 text-justify">
			<p>{post.content.description}</p>
		</section>
		<hr >
		<div class="flex items-center gap-2">
			<img
				class="w-12 h-12 rounded-full mr-4"
				src={post.actor.avatarSrc}
				alt="Author's profile picture"
			/>
			<div class="flex w-full items-center justify-between">
				<div class="-space-y-4">
					<p class="text-base md:text-lg font-semibold">
						{post.actor.name}
					</p>
					<p class="text-sm md:text-base text-gray-600">
						{new Date(post.content.createdAt.toLocaleDateString('EN', {
							dateStyle: 'long',
						})).toDateString()}
					</p>
				</div>
				<div class="">
					<Card.Title class="font-normal flex gap-1" tag="h4">
						<Icon
							class="hover:scale-110 cursor-pointer transition-all"
							icon="material-symbols-light:thumb-up"
						/>

						{post.content.interaction.like.length}
					</Card.Title>
					<Card.Title class="font-normal flex gap-1" tag="h4">
						<Icon
							class="hover:scale-110 cursor-pointer transition-all"
							icon="material-symbols-light:comment"
						/>

						{post.content.interaction.comment.length}
					</Card.Title>
				</div>
			</div>
		</div>
	</article>
</main>

<style lang="postcss">
</style>
