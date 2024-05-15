<script lang="ts">
	import FollowerSuggestion from './(component)/FollowerSuggestion.svelte';
	import SubNavbar from './(component)/SubNavbar.svelte';
	import AccordionItem from './../components/list-data/AccordionItem.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import './../app.css';

	import type { PageData } from './$types';

	import Layout from './+layout.svelte';
	import TrendAccordion from './(component)/TrendAccordion.svelte';
	import RecommendCategory from './(component)/RecommedCategory.svelte';
	import RecentlyUserEngagement from './(component)/RecentlyUserEngagement.svelte';
	// your script goes here
	export let data: PageData;
</script>

<Layout>
	<main class="lg:container mx-auto">
		<div class="grid container lg:max-w-none lg:grid-cols-3 gap-0 xl:gap-12">
			<div id="list-content" class="col-span-2 space-y-4">
				<SubNavbar />
				{#each Array(10).fill(null) as item}
					<Accordion.Root>
						<AccordionItem />
					</Accordion.Root>
				{/each}
			</div>

			<div id="side-list-content" class="border-l-2 hidden md:block border-slate-50">
				<div class="sticky bottom-0">
					<TrendAccordion />
				</div>
				<RecommendCategory />
				<FollowerSuggestion />
				<div class="sticky top-0">
					<RecentlyUserEngagement />
				</div>
			</div>
		</div>
	</main>
</Layout>
