<script>
	import './../app.css';
</script>

<div class="grid gap-6 min-h-screen w-full grid-flow-row  bg-background text-foreground">
	<slot name="sidebar"></slot>
	<slot name="navbar"></slot>
	<slot />
	<slot name="footer"></slot>
</div>
