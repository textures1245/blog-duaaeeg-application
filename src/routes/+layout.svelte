<script context="module" lang="ts">
	import type { User } from '$lib/internal/model/auth/domains/user';
	import { writable } from 'svelte/store';
	export const userActive = writable<User | null>(null);
</script>

<script lang="ts">
	import WriteOptionDialog from './user-profile/(component)/WriteOptionDialog.svelte';
	import Navbar, { type MenuAction } from '../components/Navbar.svelte';
	import './../app.css';
	import type { LayoutData } from './$types';
	import { onDestroy, onMount, SvelteComponent } from 'svelte';
	import { Toaster } from 'svelte-sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { Pencil1 } from 'svelte-radix';
	import { users } from './+page.svelte';

	export let data: LayoutData;
	let menu: MenuAction[] = [
		{
			label: 'Write',
			component: WriteOptionDialog as typeof SvelteComponent,
			icon: Pencil1 as typeof SvelteComponent
		}
	];

	let { user } = data;

	onMount(() => {
		if (user) {
			userActive.set(user);
		}
		const pathname = window.location.pathname;
		if (pathname.startsWith('/admin')) {
			// menu = ['Users'];
		}
	});

	userActive.subscribe((val) => console.info('User', val));
</script>

<div class=" min-h-screen relative w-full bg-background text-foreground">
	{#if $userActive !== null}
		<slot name="navbar">
			<Navbar {menu} user={$userActive} />
		</slot>
	{/if}
	<div class="min-h-screen grid">
		<slot></slot>
	</div>

	<slot name="footer"></slot>
</div>
<Toaster theme="dark" />
<ModeWatcher />
