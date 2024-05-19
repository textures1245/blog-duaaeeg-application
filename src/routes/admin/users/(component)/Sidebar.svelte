<script context="module" lang="ts">
	import Separator from './../../../../lib/components/ui/separator/separator.svelte';
	export type SidebarMenuAction = {
		label: string;
		hrefTarget?: string;
		component?: typeof SvelteComponent;
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button';
	import {
		type RouteInjection,
		shouldBeActive
	} from '../../../../components/RouteInjection.svelte';
	import type { SvelteComponent } from 'svelte';
	import { page } from '$app/stores';

	let className: string | null | undefined = undefined;
	export { className as class };
	export let menu: RouteInjection[];
	export let menuAction: Record<string, SidebarMenuAction[]>;

	$: currentPath = $page.url.pathname;
	$: action = menuAction[currentPath.split('/')[2]] || [];
</script>

<div class={cn('pb-12', className)}>
	<div class="space-y-4 py-4">
		<div class="px-3 py-2">
			<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Feature</h2>
			<div class="space-y-1">
				{#each menu as m (m.routeName)}
					<!-- content here -->
					<Button
						href={m.hrefTarget}
						variant={shouldBeActive(m, currentPath)}
						class="w-full gap-2 justify-start"
					>
						<svelte:component this={m.icon} />
						{m.routeName}
					</Button>
				{/each}
			</div>
		</div>
		<Separator />
		<div class="px-3 py-2">
			<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Action Extend</h2>
			<div class="space-y-1">
				{#key action}
					{#each action as a (a.label)}
						<!-- content here -->
						{#if a.hrefTarget}
							<Button href={a.hrefTarget} variant="ghost" class="w-full justify-start">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="mr-2 h-4 w-4"
								>
									<path d="M21 15V6" />
									<path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
									<path d="M12 12H3" />
									<path d="M16 6H3" />
									<path d="M12 18H3" />
								</svg>
								{a.label}
							</Button>
						{/if}

						{#if a.component}
							<svelte:component this={a.component} />
						{/if}
					{/each}
				{/key}
			</div>
		</div>
	</div>
</div>
