<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let mode: 'SIGN_IN' | 'SIGN_UP' = 'SIGN_IN';
</script>

{#if mode === 'SIGN_IN'}
	<Card.Root class="w-auto  bg-background text-foreground mx-auto grid  my-auto md:w-1/2">
		<form method="POST" action="?/sign-in">
			<Card.Header>
				<Card.Title>Sign In</Card.Title>
				<Card.Description>Enter your account below</Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-col gap-4">
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="name">Name</Label>
						<Input id="email" placeholder="Email" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="id">Framework</Label>
						<Input id="password" placeholder="Password" />
					</div>
				</div>
				<div class="flex text-red items-center gap-2">
					<Card.Description>Don't have an account</Card.Description>

					<button
						type="button"
						class="btn btn-primary"
						on:click={() => (mode = mode === 'SIGN_IN' ? 'SIGN_UP' : 'SIGN_IN')}>Sign Up</button
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
		<form>
			<Card.Header>
				<Card.Title>Sign Up</Card.Title>
				<Card.Description>Enter your account below</Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-col gap-4">
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="name">Name</Label>
						<Input id="email" placeholder="Email" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="id">Framework</Label>
						<Input id="password" placeholder="Password" />
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
