<script context="module" lang="ts">
	export type UserWithPwd = User & { password: string };
	export const userStore = writable<UserWithPwd[]>();
</script>

<script lang="ts">
	import type { User } from '$lib/internal/model/auth/domains/user';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { ActionData, PageData } from './$types';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { goto } from '$app/navigation';
	import { Dto } from '$lib/internal/model';
	import { ToastInfo } from '$lib/internal/utils/toast';
	import { Update } from 'svelte-radix';

	export let data: PageData;
	export let action: ActionData;

	setContext('users', userStore);
	if (data.users) {
		userStore.set(data.users);
	}

	$: {
		if (action?.toast) {
			ToastInfo.Run(action.toast);
		}
		// if (action?.headers) {
		// 	if (action.headers.location) goto(action.headers.location);
		// }
	}
</script>

<main>
	<Table.Root>
		<Table.Caption>A list of your recent invoices.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]"></Table.Head>
				<Table.Head>First Name</Table.Head>
				<Table.Head>Last Name</Table.Head>
				<Table.Head>Bio</Table.Head>
				<Table.Head>Subscribers</Table.Head>
				<Table.Head>Subscribing</Table.Head>
				<Table.Head>Password</Table.Head>
				<Table.Head class="text-right">Action</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body class="text-xs">
			{#each $userStore as u, i (i)}
				<Table.Row>
					<Table.Cell class="font-medium">
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
					</Table.Cell>
					<Table.Cell
						>{u.user_profile.first_name !== '' ? u.user_profile.first_name : '-'}</Table.Cell
					>
					<Table.Cell>{u.user_profile.last_name !== '' ? u.user_profile.last_name : '-'}</Table.Cell
					>
					<Table.Cell>{u.user_profile.bio !== '' ? u.user_profile.bio : '-'}</Table.Cell>
					<Table.Cell>{u.subscriber.length}</Table.Cell>
					<Table.Cell>{u.subscribing.length}</Table.Cell>
					<Table.Cell>{u.password}</Table.Cell>
					<Table.Cell class="text-right"
						><DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button variant="outline" size="sm" builders={[builder]}>Open</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content class="w-56">
								<DropdownMenu.Label>Acton</DropdownMenu.Label>
								<DropdownMenu.Separator />
								<DropdownMenu.Item    href={`users/user-profile-editor/${u.uuid}`}
									>Edit
									<DropdownMenu.Shortcut>
										<Update size="18" />
									</DropdownMenu.Shortcut>
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root></Table.Cell
					>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</main>
