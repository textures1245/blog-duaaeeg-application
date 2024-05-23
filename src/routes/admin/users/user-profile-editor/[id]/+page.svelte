<script lang="ts">
	import type { PageData } from './$types.js';
	import { Separator } from '$lib/components/ui/separator';
	import ProfileEditorForm from './ProfileEditorForm.svelte';
	import type { ActionData } from './$types.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { ToastInfo } from '$lib/internal/utils/toast.js';
	import { goto } from '$app/navigation';
	export let data: PageData;
	export let form: ActionData;

	$: {
		if (form?.toast) {
			ToastInfo.Run(form.toast);
		}
		if (form?.headers) {
			goto(form.headers.location);
		}
	}
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Edit User Profile</h3>
		<p class="text-sm text-muted-foreground">This is how others will see you on the site.</p>
	</div>
	<Separator />

	<Button
		variant="outline"
		on:click={() =>
			toast.success('Event has been created', {
				description: 'Sunday, December 03, 2023 at 9:00 AM',
				action: {
					label: 'Undo',
					onClick: () => console.info('Undo')
				}
			})}
	>
		Show Toast
	</Button>
	<ProfileEditorForm data={data.form} />
</div>
