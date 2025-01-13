<script context="module" lang="ts">
	import type { PostResDat } from '$lib/internal/model/auth/domains/post';

	export function mapPostToAccordionItemProps(post: PostResDat): AccordionItemProps {
		return {
			actor: {
				name: `${post.user?.user_profile.first_name || 'John'} ${post.user?.user_profile.last_name || 'Doe'}`,
				avatarSrc: post.user?.user_profile.profile_picture || '' // Add appropriate avatar source if available
			},
			content: {
				interaction: {
					like: post.like,
					comment: post.comments
				},
				uuid: post.uuid,
				title: post.title,
				description: post.source,
				readApproximately: Math.ceil(post.source.length / 200), // Example calculation
				tags: post.tags.tags,
				category: post.category.name,
				imageSrc: post.img_banner_url,
				createdAt: new Date(post.created_at)
			}
		};
	}
</script>

<script lang="ts">
	import PostViewer from '../(component)/PostViewer.svelte';
	import type { AccordionItemProps } from '../../../components/list-data/AccordionItem.svelte';
	// your script goes here

	export let data;
</script>

<PostViewer post={mapPostToAccordionItemProps(data.post)} />

<style lang="postcss">
	/* your styles go here */
</style>
