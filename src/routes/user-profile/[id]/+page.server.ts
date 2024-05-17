import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { profileFormSchema, type ProfileForm } from './ProfileForm.svelte';
import { Dto } from '$lib/internal/model';
import { NewUserUsecase } from '$lib/internal/usecases';
import { CookiesJsonParser } from '$lib/internal/utils/cookies';
import type { AxiosError } from 'axios';
export const load: PageServerLoad = async ({ cookies }) => {
	const { user } = CookiesJsonParser(cookies, 'user');
	console.log(user);
	const dat = user.user_profile as unknown as ProfileForm;

	return { form: await superValidate(dat, zod(profileFormSchema)) };
};

export const actions: Actions = {
	updateProfile: async (event) => {
		// const { first_name, last_name, bio, profile_picture } = Object.fromEntries(await event.request.formData()) as ProfileForm;
		const form = await superValidate(event, zod(profileFormSchema));
		console.info('form :', form);
		if (!form.valid) {
			console.info('form :', form);
			// const err = Dto.ReturnError(
			// 	`Failed to update profile, please check your input.`,
			// 	new Error(form.message)
			// );
			return fail(400, {
				form
			});
		}

		try {
			const { token, user } = CookiesJsonParser(event.cookies, 'token', 'user');
			const res = await NewUserUsecase.onUpdateUserProfile(
				form.data,
				token.access_token,
				user.uuid
			);
			if (res.status_code !== 200) {
				console.error(res);
				return fail(res.status_code, {
					form
				});
			}

			user.user_profile = res.result;

			event.cookies.set('user', JSON.stringify(user), { path: '/', httpOnly: true, secure: true });

			return {
				form,
				result: Dto.ReturnSuccess(`Profile has been updated.`)
			};
		} catch (error) {
			const err = new Error((error as AxiosError).message);
			const res = Dto.ReturnError(`Failed to update profile, please try again.`, err);
			return fail(res.status_code, {
				form
			});
		}
	}
};
