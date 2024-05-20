<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Avatar from '$lib/components/ui/avatar';

	import { Button } from '$lib/components/ui/button';
	import type { User } from '$lib/internal/model/auth/domains/user';

	export let users: User[];
</script>

<Card.Root class="rounded-none shadow-none border-0">
	<Card.Header>
		<Card.Title tag="h1">Who to follow</Card.Title>
		<Card.Description>Base from kind of Authors you were followed</Card.Description>
	</Card.Header>
	{#each users as user}
		<Card.Content id="author-list-item-section" class="grid gap-0 xl:gap-4 grid-cols-5">
			<Avatar.Root>
				<Avatar.Image
					src={user.user_profile.profile_picture}
					alt={user.user_profile.first_name ?? 'avatar-img'}
				/>
				<Avatar.Fallback
					>{user.user_profile.first_name
						? user.user_profile.first_name[0].toUpperCase()
						: '-'}</Avatar.Fallback
				>
			</Avatar.Root>
			<div class="flex flex-col gap-4 col-span-3">
				<Card.Title class="font-normal" tag="h6"
					>{user.user_profile.first_name || '-'} {user.user_profile.last_name}</Card.Title
				>
				<Card.Description class="font-light text-sm text-gray-500"
					>{user.user_profile.bio}</Card.Description
				>
			</div>
			<div class="grid place-item-center">
				<Button class="bg-black text-white" size="sm">Subscribe</Button>
			</div>
		</Card.Content>
	{/each}
	<Card.Footer class="-mt-2">
		<slot name="footer" />
	</Card.Footer>
</Card.Root>
