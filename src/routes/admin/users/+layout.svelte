<script lang="ts">
	import SubNavbar from '../../(component)/SubNavbar.svelte';
</script>

<div class="lg:container mx-auto">
	<SubNavbar menu={['Users Active']} />
	<slot><!-- optional fallback --></slot>
</div>
