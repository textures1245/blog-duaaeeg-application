<script lang="ts">
	let className: string | undefined | null = undefined;
	export let imageSrc;
	export let imageSrcAlt;
	export let aspectRatio: 'portrait' | 'square' = 'square';
	export let width: number;
	export let height: number;
</script>

<div class={className}>
	<div class="overflow-hidden rounded-md">
		<img
			class="h-auto w-auto object-cover transition-all hover:scale-105 {aspectRatio === 'portrait'
				? 'aspect-[3/4]'
				: 'aspect-square'}"
			src={imageSrc}
			alt={imageSrcAlt}
			{width}
			{height}
		/>
	</div>

	<!-- <div class="space-y-1 text-sm">
		<h3 class="font-medium leading-none">{album.name}</h3>
		<p class="text-xs text-muted-foreground">{album.artist}</p>
	</div> -->
</div>
