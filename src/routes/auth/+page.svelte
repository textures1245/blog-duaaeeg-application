<script context="module" lang="ts">
</script>

<script lang="ts">
	import Toast from './../../components/Toast.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { ActionData, PageData } from './$types';
	import { ToastInfo } from '$lib/internal/utils/toast';
	import { enhance } from '$app/forms';

	let mode: 'SIGN_IN' | 'SIGN_UP' = 'SIGN_IN';
	// export let data: PageData;
	export let form: ActionData;

	$: {
		if (form?.toast) {
			ToastInfo.Run(form.toast);
		}
		// if (action?.headers) {
		// 	if (action.headers.location) goto(action.headers.location);
		// }
	}
</script>

{#if form?.status_code === 500}
	<Toast classList="bg-primary text-white" msg={form.message} status={form.status} />
{/if}

{#if mode === 'SIGN_IN'}
	<Card.Root class="w-full sm:w-[40rem]  bg-background text-foreground mx-auto grid  ">
		<form method="POST" use:enhance action="?/signIn">
			<Card.Header>
				<Card.Title>Sign In</Card.Title>
				<Card.Description>Enter your account below</Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-col gap-4">
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="name">Name</Label>
						<Input name="email" required type="email" id="email" placeholder="Email" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="id">Framework</Label>
						<Input name="password" required type="password" id="password" placeholder="Password" />
					</div>
				</div>
				<div class="flex text-red items-center gap-2">
					<Card.Description>Don't have an account</Card.Description>

					<Button
						size="sm"
						type="button"
						class="btn btn-primary"
						on:click={() => (mode = mode === 'SIGN_IN' ? 'SIGN_UP' : 'SIGN_IN')}>Sign Up</Button
					>
				</div>
			</Card.Content>
			<Card.Footer class="flex justify-between">
				<Button variant="outline">Cancel</Button>
				<Button type="submit" class="btn-primary">Sign In</Button>
			</Card.Footer>
		</form>
	</Card.Root>
{:else}
	<Card.Root class="w-auto  mx-auto grid  my-auto md:w-1/2">
		<form method="POST" action="?/signUp">
			<Card.Header>
				<Card.Title>Sign Up</Card.Title>
				<Card.Description>Enter your account below</Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-col gap-4">
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="name">Name</Label>
						<Input required type="email" name="email" id="email" placeholder="Email" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="id">Framework</Label>
						<Input required type="password" name="password" id="password" placeholder="Password" />
					</div>
				</div>
				<div class="flex text-red items-center gap-2">
					<Card.Description>Have an account already?</Card.Description>
					<Button
						type="button"
						class="btn-primary"
						on:click={() => (mode = mode === 'SIGN_IN' ? 'SIGN_UP' : 'SIGN_IN')}
						size="sm">Sign In</Button
					>
				</div>
			</Card.Content>
			<Card.Footer class="flex justify-between">
				<Button variant="outline">Cancel</Button>
				<Button type="submit" class="btn-primary">Sign Up</Button>
			</Card.Footer>
		</form>
	</Card.Root>
{/if}
