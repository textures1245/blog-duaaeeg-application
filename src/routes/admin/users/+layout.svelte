<script lang="ts">
	import SubNavbar from '../../(component)/SubNavbar.svelte';

	import { page } from '$app/stores';

	$: pathBreadcrumb = $page.url.pathname
		.replace('-', ' ')
		.split('/')
		.slice(2)
		.map((item) => item.charAt(0).toUpperCase() + item.slice(1));
</script>

<div class="lg:container mx-auto">
	<SubNavbar menu={pathBreadcrumb} />
	<slot><!-- optional fallback --></slot>
</div>
