import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { profileFormSchema } from './ProfileForm.svelte';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(profileFormSchema)) };
};
