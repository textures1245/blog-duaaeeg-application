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
	import { mapPostToAccordionItemProps } from './posts/[id]/+page.svelte';
	import type { UserWithPwd } from './admin/users/+page.svelte';
	import { userActive } from './+layout.svelte';

	export let data: PageData;
	const menu: SubNavbarMenu[] = [
		{ path: '', label: 'For you' },
		{ path: 'explore', label: 'Explore' },
		{ path: 'trend', label: 'Trend' },
		{ path: 'trend', label: 'Following' }
	];

	const posts = data.posts.map(mapPostToAccordionItemProps);

	onMount(() => {
		userActive.set(data.user);

		if (data.users) {
			users.set(data.users);
		}
	});
</script>

<main class="lg:container mx-auto">
	<div class="grid container lg:max-w-none lg:grid-cols-3 gap-0 xl:gap-12">
		<div id="lisfot-content" class="col-span-2 space-y-4">
			<SubNavbar {menu} rootPath="" />
			{#each posts as item}
				<Accordion.Root>
					<AccordionItem prop={item} />
				</Accordion.Root>
			{:else}
				<h1 class="place-self-center">No post available</h1>
			{/each}
		</div>

		<div id="side-list-content" class="border-l-2 hidden md:block border-slate-50">
			<div class="sticky bottom-0">
				<TrendAccordion props={posts} />
			</div>
			<RecommendCategory />
			<FollowerSuggestion users={$users || []} />
			<div class="sticky top-0">
				<RecentlyUserEngagement />
			</div>
		</div>
	</div>
</main>
