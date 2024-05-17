<script lang="ts">
	import SubNavbar from './../(component)/SubNavbar.svelte';
	import type { LayoutData } from './$types';
</script>

<div class="lg:container mx-auto">
	<SubNavbar />
	<slot><!-- optional fallback --></slot>
</div>
