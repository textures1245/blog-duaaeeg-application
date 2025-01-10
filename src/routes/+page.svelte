<script context="module" lang="ts">
	import { writable } from 'svelte/store';

	export const users = writable<User[]>();
</script>

<script lang="ts">
	import FollowerSuggestion from './(component)/FollowerSuggestion.svelte';
	import SubNavbar, { type SubNavbarMenu } from './(component)/SubNavbar.svelte';
	import AccordionItem from './../components/list-data/AccordionItem.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import './../app.css';

	import TrendAccordion from './(component)/TrendAccordion.svelte';
	import RecommendCategory from './(component)/RecommedCategory.svelte';
	import RecentlyUserEngagement from './(component)/RecentlyUserEngagement.svelte';
	import type { User } from '$lib/internal/model/auth/domains/user';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { AccordionItemProps } from './../components/list-data/AccordionItem.svelte';
	import type { PostResDat } from '$lib/internal/model/auth/domains/post';

	export let data: PageData;
	const menu: SubNavbarMenu[] = [
		{ path: '', label: 'For you' },
		{ path: 'explore', label: 'Explore' },
		{ path: 'trend', label: 'Trend' },
		{ path: 'trend', label: 'Following' }
	];

	onMount(() => {
		if (data.users) {
			users.set(data.users);
		}
	});

	function mapPostToAccordionItemProps(post: PostResDat): AccordionItemProps {
		return {
			actor: {
				name: `${post.user?.user_profile.first_name || "John"} ${post.user?.user_profile.last_name || "Doe"}`,
				avatarSrc: post.user?.user_profile.profile_picture || ""  // Add appropriate avatar source if available
			},
			content: {
				title: post.title,
				description: post.source,
				readApproximately: Math.ceil(post.source.length / 200), // Example calculation
				tags: post.tags.tags,
				category: post.category.name,
				imageSrc: post.img_banner_url,
				createdAt: new Date(post.created_at)
			}
		};
	}
</script>

<main class="lg:container mx-auto">
	<div class="grid container lg:max-w-none lg:grid-cols-3 gap-0 xl:gap-12">
		<div id="lisfot-content" class="col-span-2 space-y-4">
			<SubNavbar {menu} rootPath="" />
			{#each data.posts.map(mapPostToAccordionItemProps) as item}
				<Accordion.Root>
					<AccordionItem prop={item} />
				</Accordion.Root>
			{:else}
				<h1 class="place-self-center">No post available</h1>
			
			{/each}
		</div>

		<div id="side-list-content" class="border-l-2 hidden md:block border-slate-50">
			<div class="sticky bottom-0">
				<TrendAccordion />
			</div>
			<RecommendCategory />
			<FollowerSuggestion users={$users || []} />
			<div class="sticky top-0">
				<RecentlyUserEngagement />
			</div>
		</div>
	</div>
</main>
