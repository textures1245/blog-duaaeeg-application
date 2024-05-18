<script lang="ts">
	import Separator from './../../../../../lib/components/ui/separator/separator.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input/index';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Avatar from '$lib/components/ui/avatar';
	import { browser } from '$app/environment';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import {
		profileFormSchema,
		type ProfileForm,
		type ProfileFormSchema
	} from '../../../../user-profile/[id]/ProfileForm.svelte';
	import type { UserWithPwd } from '../../+page.svelte';
	import { page } from '$app/stores';
	import { userStore } from '../../+page.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data: SuperValidated<Infer<ProfileFormSchema>>;

	// const userStore = getContext<Writable<UserWithPwd[]>>('users');
	console.log($userStore);
	const user = $userStore.find((u) => u.uuid === $page.params.id);
	if (!user) {
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
		<Form.Description>
			This is your public display name. It can be your real name or a pseudonym. You can only change
			this once every 30 days.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="last_name">
		<Form.Control let:attrs>
			<Form.Label>Last Name</Form.Label>
			<Form.Control let:attrs>
				<Input placeholder="Doo" {...attrs} bind:value={$formData.last_name} />
			</Form.Control>
			<Form.Description>
				This is your public display name. It can be your real name or a pseudonym. You can only
				change this once every 30 days.
			</Form.Description>
			<Form.FieldErrors />
		</Form.Control>
		<Form.Description>
			You can manage verified email addresses in your <a href="/examples/forms">email settings</a>.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="bio">
		<Form.Control let:attrs>
			<Form.Label>Bio</Form.Label>
			<Textarea placeholder="Too young too died." {...attrs} bind:value={$formData.bio} />
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
	<!-- <div>
		<Form.Fieldset {form} name="urls">
			<Form.Legend>URLs</Form.Legend>
			{#each $formData.urls as _, i}
				<Form.ElementField {form} name="urls[{i}]">
					<Form.Description class={cn(i !== 0 && 'sr-only')}>
						Add links to your website, blog, or social media profiles.
					</Form.Description>
					<Form.Control let:attrs>
						<Input {...attrs} bind:value={$formData.urls[i]} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.ElementField>
			{/each}
		</Form.Fieldset>
		<Button type="button" variant="outline" size="sm" class="mt-2" on:click={addUrl}>
			Add URL
		</Button>
	</div> -->

	<div class="flex gap-4">
		<Form.Button>Update profile</Form.Button>
		<Form.Button variant="destructive" formaction="?/deleteUser">Delete User</Form.Button>
		<Separator orientation="vertical" />
		<AlertDialog.Root>
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
		</AlertDialog.Root>
	</div>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}
