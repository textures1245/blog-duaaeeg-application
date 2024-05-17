<script context="module" lang="ts">
	export type UserWithPwd = User & { password: string };
</script>

<script lang="ts">
	import UserItem from './../../../components/list-data/UserItem.svelte';
	import type { User } from '$lib/internal/model/auth/domains/user';
	import FollowerSuggestion from '../../(component)/FollowerSuggestion.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';

	export let data: PageData;

	const userStore = writable<UserWithPwd[]>();
	$: {
		if (data.users) {
			userStore.set(data.users);
		}
	}

	setContext('users', userStore);

	import * as Table from '$lib/components/ui/table/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';

	const invoices = [
		{
			invoice: 'INV001',
			paymentStatus: 'Paid',
			totalAmount: '$250.00',
			paymentMethod: 'Credit Card'
		},
		{
			invoice: 'INV002',
			paymentStatus: 'Pending',
			totalAmount: '$150.00',
			paymentMethod: 'PayPal'
		},
		{
			invoice: 'INV003',
			paymentStatus: 'Unpaid',
			totalAmount: '$350.00',
			paymentMethod: 'Bank Transfer'
		},
		{
			invoice: 'INV004',
			paymentStatus: 'Paid',
			totalAmount: '$450.00',
			paymentMethod: 'Credit Card'
		},
		{
			invoice: 'INV005',
			paymentStatus: 'Paid',
			totalAmount: '$550.00',
			paymentMethod: 'PayPal'
		},
		{
			invoice: 'INV006',
			paymentStatus: 'Pending',
			totalAmount: '$200.00',
			paymentMethod: 'Bank Transfer'
		},
		{
			invoice: 'INV007',
			paymentStatus: 'Unpaid',
			totalAmount: '$300.00',
			paymentMethod: 'Credit Card'
		}
	];
</script>

<main>
	<!-- <Card.Root class="rounded-none space-y-4 shadow-none border-0">
		<Card.Header>
			<Card.Title tag="h1">Who to follow</Card.Title>
			<Card.Description>Base from kind of Authors you were followed</Card.Description>
		</Card.Header>
        <div class="gap-4">
            
        </div>
		{#each $userStore as u}
			<UserItem {u} />
		{/each}
		<Card.Footer class="-mt-2">
			<slot name="footer" />
		</Card.Footer>
	</Card.Root> -->

	<Table.Root>
		<Table.Caption>A list of your recent invoices.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">-</Table.Head>
				<Table.Head>First Name</Table.Head>
				<Table.Head>Last Name</Table.Head>
				<Table.Head>Bio</Table.Head>
				<Table.Head>Password</Table.Head>
				<Table.Head class="text-right">Action</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
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
						>{u.user_profile.first_name !== '' ? u.user_profile.first_name : 'John'}</Table.Cell
					>
					<Table.Cell
						>{u.user_profile.last_name !== '' ? u.user_profile.last_name : 'Doo'}</Table.Cell
					>
					<Table.Cell>{u.user_profile.bio !== '' ? u.user_profile.bio : '-'}</Table.Cell>
					<Table.Cell>{u.password}</Table.Cell>
					<Table.Cell class="text-right"><Button>Action</Button></Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</main>
