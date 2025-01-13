<script lang="ts" context="module">
	import { z } from 'zod';
	export const profileFormSchema = z.object({
		first_name: z
			.string()
			.min(2, 'Username must be at least 2 characters.')
			.max(30, 'Username must not be longer than 30 characters'),
		last_name: z.string(),
		bio: z
			.string()
			.min(4, 'Bio must be at least 4 characters.')
			.max(160, 'Bio must not be longer than 160 characters.'),
		profile_picture: z
			.string()
			.url()
			.default('https://avatars.githubusercontent.com/u/83662667?v=4')
	});
	export type ProfileFormSchema = typeof profileFormSchema;
	export type ProfileForm = z.infer<typeof profileFormSchema>;
</script>

<script lang="ts">
	import Separator from '../../lib/components/ui/separator/separator.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input/index';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Avatar from '$lib/components/ui/avatar';
	import { browser } from '$app/environment';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import type { UserWithPwd } from '../admin/users/+page.svelte';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import type { User } from '$lib/internal/model/auth/domains/user';

	export let data: SuperValidated<Infer<ProfileFormSchema>>;

	export let user: User | UserWithPwd | null | undefined;

	
	if (user === null || user === undefined) {
		throw new Error('User not found');
	}

	const dat = user.user_profile as unknown as ProfileForm;

	const form = superForm(dat, {
		validators: zodClient(profileFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-8" action="?/updateProfile" id="profile-form">
	<Form.Field {form} name="first_name">
		<Form.Control let:attrs>
			<Form.Label>First Name</Form.Label>
			<Input placeholder="John" {...attrs} bind:value={$formData.first_name} />
		</Form.Control>
		<Form.Description>Require your first name to be at least 2 characters long.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="last_name">
		<Form.Control let:attrs>
			<Form.Label>Last Name</Form.Label>
			<Form.Control let:attrs>
				<Input placeholder="Doo" {...attrs} bind:value={$formData.last_name} />
			</Form.Control>
			<Form.Description>Require your last name to be at least 2 characters long.</Form.Description>
			<Form.FieldErrors />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="bio">
		<Form.Control let:attrs>
			<Form.Label>Bio</Form.Label>
			<Textarea placeholder="Enter your bio" {...attrs} bind:value={$formData.bio} />
		</Form.Control>
		<Form.Description>
			You can <span>@mention</span> other users and organizations to link to them.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<div class="flex gap-4 items-center justify-between">
		<Form.Field class="grow" {form} name="profile_picture">
			<Form.Control let:attrs>
				<Form.Label>Bio</Form.Label>
				<Input {...attrs} bind:value={$formData.profile_picture} />
			</Form.Control>
			<Form.Description>URL of your profile picture.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Avatar.Root>
			<Avatar.Image src={$formData.profile_picture} alt="profile-picture-avatar" />
		</Avatar.Root>
	</div>
	<div class="flex gap-4">
		<Form.Button>Update profile</Form.Button>
		<Form.Button variant="destructive" formaction="?/deleteUser">Delete User</Form.Button>
		<Separator orientation="vertical" />
		<!-- <AlertDialog.Root>
			<AlertDialog.Trigger asChild let:builder>
				<Form.Button variant="destructive" builders={[builder]}>Delete User</Form.Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
					<AlertDialog.Description>
						This action cannot be undone. This will permanently delete user account and remove your
						data from the servers.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<Form.Button
						variant="destructive"
						on:click={() => console.log('d')}
						formaction="?/deleteUser">Delete User</Form.Button
					>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root> -->
	</div>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}
