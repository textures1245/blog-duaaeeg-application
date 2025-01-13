<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import type { PostResDat } from '$lib/internal/model/auth/domains/post';

	let post: PostResDat;

	onMount(() => {
		const data = get(page).data;
		post = data.post;
	});
</script>

<main class="container mx-auto py-8">
	<article class="prose lg:prose-xl mx-auto">
		<h1 class="text-4xl font-bold mb-4">{post.title}</h1>
		<div class="flex items-center mb-8">
			<img
				class="w-12 h-12 rounded-full mr-4"
				src={post.user?.user_profile.profile_picture}
				alt="Author's profile picture"
			/>
			<div>
				<p class="text-lg font-semibold">
					{post.user?.user_profile.first_name}
					{post.user?.user_profile.last_name}
				</p>
				<p class="text-sm text-gray-600">{new Date(post.created_at).toLocaleDateString()}</p>
			</div>
		</div>
		<img class="w-full rounded-md mb-8" src={post.img_banner_url} alt="Post banner image" />
		<!-- <div class="content" bind:this={postContent}></div> -->
	</article>
</main>

<style lang="postcss">
	
</style>
