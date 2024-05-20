<script lang="ts">
	import Separator from './../../lib/components/ui/separator/separator.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	export let menu: string[];
	export let rootPath;
</script>

<div style="border-width: 0 0 1.5px 0" class="grid bg h-14 items-center">
	<header
		class="sticky shadow-none top-0 z-30 h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
	>
		<Breadcrumb.Root class="overflow-auto flex gap-16 items-center">
			<Breadcrumb.List>
				{#each menu as m}
					<Breadcrumb.Item class="flex gap-4">
						<Breadcrumb.Link href={`${rootPath}/${m ? m.toLowerCase() : ''}`}>{m}</Breadcrumb.Link>
						<Breadcrumb.Separator />
					</Breadcrumb.Item>
				{/each}
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</header>
</div>
