<script>
	import Navbar from '../components/Navbar.svelte';
	import './../app.css';
</script>

<div class="grid gap-6 min-h-screen w-full grid-flow-row  bg-background text-foreground">
	<slot name="sidebar"></slot>
	<slot name="navbar">
		<Navbar />
	</slot>
	<slot />
	<slot name="footer"></slot>
</div>
