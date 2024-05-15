<script>
	import BreadcrumbPage from '$lib/components/ui/breadcrumb/breadcrumb-page.svelte';
	import BreadcrumbSeparator from '$lib/components/ui/breadcrumb/breadcrumb-separator.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import * as Sheet from '$lib/components/ui/sheet/index';

	export let menu = ['Dashboard', 'For you', 'Explore', 'Trend'];
</script>

<div style="border-width: 0 0 1.5px 0" class="grid bg h-14 items-center">
	<header
		class="sticky shadow-none top-0 z-30  h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
	>
		<Breadcrumb.Root class="overflow-auto flex gap-16 items-center">
			<Breadcrumb.List>
				{#each menu as m}
					<Breadcrumb.Item class="flex gap-3">
						<Breadcrumb.Link
							style="	color: rgb(31 41 55);"
							href={m}
							class="text-base  text-slate-200">{m}</Breadcrumb.Link
						>

						<div class="font-lighter text-sm mr-3 text-slate-50">|</div>
					</Breadcrumb.Item>
				{/each}
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</header>
</div>
