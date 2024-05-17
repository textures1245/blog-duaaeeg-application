<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Avatar from '$lib/components/ui/avatar';

	import { Button } from '$lib/components/ui/button';
	import type { User } from '$lib/internal/model/auth/domains/user';

	export let u: User;
	let fullName = `${u.user_profile.first_name !== '' ? u.user_profile.first_name : 'John'}  ${u.user_profile.last_name !== '' ? u.user_profile.last_name : 'Doo'}`;
</script>

<Card.Content id="author-list-item-section" class="grid gap-6 grid-cols-5">
	<Avatar.Root>
		<Avatar.Image
			src={u.user_profile.profile_picture}
			alt={u.user_profile.profile_picture ?? 'avatar-img'}
		/>
		<Avatar.Fallback
			>{u.user_profile.first_name
				? u.user_profile.first_name[0].toUpperCase()
				: 'J'}</Avatar.Fallback
		>
	</Avatar.Root>
	<div class="flex flex-col gap-4 col-span-3">
		<Card.Title class="font-normal" tag="h4">{fullName}</Card.Title>
		<Card.Description class="font-light text-gray-500"
			>{u.user_profile.bio ?? 'No Bio descried'}</Card.Description
		>
	</div>
	<div class="grid place-item-center">
		<Button class="bg-black text-white" size="sm">Action</Button>
	</div>
</Card.Content>
