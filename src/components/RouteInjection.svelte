<script context="module" lang="ts">
	import type { SvelteComponent } from "svelte";

	export type VariantActive =
		| 'link'
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost';

	export type RouteInjection = {
		routeName: string;
		hrefTarget: string;
		classActive: VariantActive;
		classDeactive: VariantActive;
        icon: typeof SvelteComponent;
	};

	// export function shouldBeActive(elem: SvelteComponent, injection: RouteInjection) {
	// 	const currentPath = window.location.pathname;
	// 	if (injection.hrefTarget === currentPath) {
	// 		return
	// 	} else {
	// 		elem.setAttribute('variant', injection.classDeactive);
	// 	}
	// }
	export function shouldBeActive(injection: RouteInjection, currentPath: string): VariantActive {
		if (injection.hrefTarget === currentPath) {
			return injection.classActive;
		} else {
			return injection.classDeactive;
		}
	}
</script>
