<script context="module" lang="ts">
	export class CreateUserDialog extends SvelteComponent {}
</script>

<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { SvelteComponent } from 'svelte';
	import { Upload } from 'svelte-radix';
</script>

<Dialog.Root>
	<Dialog.Trigger class={ buttonVariants({ variant: 'ghost' })}>
		<div class="gap-2 flex grow">
            <span>
                <Upload size="18" />
            </span> Create User
        </div>
        </Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Create New User</Dialog.Title>
			<Dialog.Description>
				Create new user account here. Click create when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<form method="POST" action="?/createUser">
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="email" class="text-right">Email</Label>
					<Input id="email" name="email" value="test@test.com" class="col-span-3" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="password" class="text-right">Password</Label>
					<Input
						id="password"
						name="password"
						value="must be more than 8 character"
						class="col-span-3"
					/>
				</div>
			</div>
			<Button type="submit">Create</Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
