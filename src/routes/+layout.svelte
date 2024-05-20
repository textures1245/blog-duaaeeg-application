<script lang="ts">
	import Navbar, { type MenuAction } from '../components/Navbar.svelte';
	import './../app.css';
	import type { LayoutData } from './$types';
	import { onMount, SvelteComponent } from 'svelte';
	import { Toaster } from 'svelte-sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { Pencil1 } from 'svelte-radix';
	import WriteOptionDialog from './user-profile/(component)/WriteOptionDialog.svelte';

	

	export let data: LayoutData;
	let menu: MenuAction[] = [
		{
			label: 'Write',
			component: WriteOptionDialog as typeof SvelteComponent,
			icon: Pencil1 as typeof SvelteComponent
		}
	];
	const { user, status } = data;

	onMount(() => {
		const pathname = window.location.pathname;
		if (pathname.startsWith('/admin')) {
			// menu = ['Users'];
		}
	});
</script>

<div class=" min-h-screen relative w-full bg-background text-foreground">
	<slot name="sidebar"></slot>
	<div class="min-h-screen grid">
		<slot name="navbar">
			<Navbar {menu} {user} />
		</slot>
		<slot></slot>
	</div>

	<slot name="footer"></slot>
</div>
<Toaster theme="dark" />
<ModeWatcher />
