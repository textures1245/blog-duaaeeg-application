<script lang="ts">
	import Separator from './../../lib/components/ui/separator/separator.svelte';
	import { page } from '$app/stores';
	import type { SvelteComponent } from 'svelte';
	import type { RouteInjection } from '../../components/RouteInjection.svelte';
	import CreateUserDialog from './users/(component)/CreateUserDialog.svelte';
	import Sidebar, { type SidebarMenuAction } from './users/(component)/Sidebar.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Avatar, Bookmark, File } from 'svelte-radix';
	import BreadcrumbPath from '../(component)/BreadcrumbPath.svelte';

	$: pathBreadcrumb = $page.url.pathname
		.replace('-', ' ')
		.split('/')
		.slice(2)
		.map((item) => item.charAt(0).toUpperCase() + item.slice(1));

	const sidebarMenu: RouteInjection[] = [
		{
			routeName: 'Users',
			hrefTarget: '/admin/users',
			classActive: 'secondary',
			classDeactive: 'ghost',
			icon: Avatar as typeof SvelteComponent
		},
		{
			routeName: 'File Storage',
			hrefTarget: '/admin/files',
			classActive: 'secondary',
			classDeactive: 'ghost',
			icon: File as typeof SvelteComponent
		},
		{
			routeName: 'Post',
			hrefTarget: '/admin/posts',
			classActive: 'secondary',
			classDeactive: 'ghost',
			icon: Bookmark as typeof SvelteComponent
		}
	];

	const sidebarMenuAction: Record<string, SidebarMenuAction[]> = {
		users: [
			{
				label: 'Create User',
				component: CreateUserDialog as typeof SvelteComponent
			}
		],
		post: []
	};
</script>

<div class="lg:container mx-auto">
	<Card.Root class="my-5">
		<Card.Content>
			<BreadcrumbPath rootPath={'/admin'} menu={pathBreadcrumb} />
			<div class="grid lg:grid-cols-5 gap-x-4">
				<side class="flex">
					<Sidebar menuAction={sidebarMenuAction} menu={sidebarMenu} class="hidden lg:block" />
					<Separator orientation="vertical" />
				</side>
				<div class="col-span-4">
					<slot><!-- optional fallback --></slot>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</div>
