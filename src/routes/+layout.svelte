<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import './../app.css';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';

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

<div class="grid gap-6 min-h-screen w-full grid-flow-row bg-background text-foreground">
	<slot name="sidebar"></slot>
	<slot name="navbar">
		<Navbar {menu} {user} />
	</slot>
	<slot />
	<slot name="footer"></slot>
</div>
