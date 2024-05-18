<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import './../app.css';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-sonner';

	export let data: LayoutData;
	let menu = ['Dashboard', 'For you', 'Explore', 'Trend'];
	const { user, status } = data;

	onMount(() => {
		const pathname = window.location.pathname;
		if (pathname.startsWith('/admin')) {
			menu = ['Users'];
		}
	});
</script>

<div class="dark min-h-screen relative w-full bg-background text-foreground">
	<slot name="sidebar"></slot>
	<div class="min-h-screen grid">
		<slot name="navbar">
			<Navbar {menu} {user} />
		</slot>
		<slot />
	</div>
	<slot name="footer"></slot>
</div>
<Toaster theme="dark" />
