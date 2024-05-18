import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { NewUserUsecase } from '$lib/internal/usecases';
import { CookiesJsonParser } from '$lib/internal/utils/cookies';
// import type { AxiosError } from 'axios';
import { profileFormSchema } from '../../../../user-profile/[id]/ProfileForm.svelte';
import type { HeaderConfig } from '$lib/internal/adapters/handler';
import { toast } from 'svelte-sonner';
// import { redirect } from '@sveltejs/kit';
import { AxiosError } from 'axios';
import { ToastInfo } from '$lib/internal/utils/toast';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(
			{
				first_name: '',
				last_name: '',
				bio: '',
				profile_picture: ''
			},
			zod(profileFormSchema)
		)
	};
};

export const actions: Actions = {
	updateProfile: async (event) => {
		const form = await superValidate(event, zod(profileFormSchema));

		console.info('form :', form);
		if (!form.valid) {
			console.info('Invalidation Inputs:', form);
			toast.error('Invalidation Inputs', {
				description: form.message
			});
			return {
				form: fail(400, {
					form
				}),
				toast: new ToastInfo('Failed to update profile, please try again.', {
					description: form.message
				}).Dto()
			};
		}

		try {
			const headerConfig: HeaderConfig = {
				role: 'ADMIN'
			};
			const { token } = CookiesJsonParser(event.cookies, 'token');
			const res = await NewUserUsecase.onUpdateUserProfile(
				form.data,
				token.access_token,
				event.params.id,
				headerConfig
			);
			if (res.status_code !== 200) {
				console.error(res);

				return {
					form: fail(400, {
						form
					}),
					toast: new ToastInfo('Failed to update profile, please try again.', {
						description: res.message
					}).Dto()
				};
			}
		} catch (error) {
			return {
				form: fail(400, {
					form
				}),
				toast: new ToastInfo('Failed to update profile, please try again.', {
					description: (error as AxiosError).message
				}).Dto()
			};
		}

		// throw redirect(303, '/admin/users');
		return {
			form,
			toast: new ToastInfo('Action Successfully ', {
				description: new Date().toLocaleString('th-US')
			}).Dto(),
			status: 303,
			headers: {
				location: '/admin/users'
			}
		};
	},

	deleteUser: async (event) => {
		const form = await superValidate(event, zod(profileFormSchema));
		try {
			const headerConfig: HeaderConfig = {
				role: 'ADMIN'
			};
			const { token } = CookiesJsonParser(event.cookies, 'token');
			console.log('event.params.id :', event.params.id);
			const res = await NewUserUsecase.onDeleteUser(
				event.params.id,
				token.access_token,
				headerConfig
			);
			if (res.status_code !== 200) {
				console.error(res);
				return {
					form: fail(400, {
						form
					}),
					toast: new ToastInfo('Failed to delete user, please try again.', {
						description: res.message
					}).Dto()
				};
			}
		} catch (error) {
			console.error((error as AxiosError).response);
			return {
				form: fail(400, {
					form
				}),
				toast: new ToastInfo('Failed to delete user, please try again.', {
					description: (error as AxiosError).message
				}).Dto()
			};
		}

		return {
			form,
			toast: new ToastInfo('Action Successfully ', {
				description: new Date().toLocaleString('th-US')
			}).Dto(),
			status: 303,
			headers: {
				location: '/admin/users'
			}
		};
	}
};
