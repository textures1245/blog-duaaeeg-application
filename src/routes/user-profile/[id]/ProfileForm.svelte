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
	import { tick } from 'svelte';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Avatar from '$lib/components/ui/avatar';
	import { cn } from '$lib/utils.js';
	import { browser } from '$app/environment';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<ProfileFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(profileFormSchema)
	});

	const { form: formData, errors } = form;

	// function addUrl() {
	// 	$formData.urls = [...$formData.urls, ''];

	// 	tick().then(() => {
	// 		const urlInputs = Array.from(
	// 			document.querySelectorAll<HTMLElement>("#profile-form input[name='urls']")
	// 		);
	// 		const lastInput = urlInputs[urlInputs.length - 1];
	// 		lastInput && lastInput.focus();
	// 	});
	// }
</script>

<form method="POST" class="space-y-8"  action="?/updateProfile" id="profile-form">
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

	<Form.Button>Update profile</Form.Button>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}
