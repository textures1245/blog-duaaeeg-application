import { NewAuthUsecase, NewUserUsecase } from '$lib/internal/usecases';
import { cookiesConfig, CookiesJsonParser } from '$lib/internal/utils/cookies';
import { fail } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { Dto } from '$lib/internal/model';
import type { AxiosError } from 'axios';
import type { UserWithPwd } from './+page.svelte';
import { AEWDecryption } from '$lib/internal/utils/encryption';
import { AEW_KEY } from '$env/static/private';
import {
	AuthCredentialSchema,
	type AuthCredential,
	type AuthOption
} from '$lib/internal/model/auth/domains/auth';
import { zValidate } from '$lib/internal/utils/validation';
import { ToastInfo } from '$lib/internal/utils/toast';

export const load: PageServerLoad = async ({ cookies }) => {
	// get users data
	try {
		const { token } = CookiesJsonParser(cookies, 'token');
		const res = await NewUserUsecase.onGetUsers(token.access_token, 'WITH_PASSWORD');

		if (res.status_code !== 200) {
			console.error(res);
			return fail(res.status_code, { message: res.message });
		}

		let users = res.result as UserWithPwd[];
		if (users.length > 0) {
			users = users.map((user) => {
				const keyBuffer = Buffer.alloc(32);
				keyBuffer.write(AEW_KEY);
				user.password = AEWDecryption(user.password, keyBuffer);
				return user;
			});
		}

		return {
			users
		};
	} catch (error) {
		const res = Dto.ReturnError(`Failed to get users data, please try again.`, error as AxiosError);
		console.error(res);
		return fail(res.status_code, { message: res });
	}
};

export const actions: Actions = {
	createUser: async ({ request, cookies }) => {
		console.log('createUser');
		const { email, password } = Object.fromEntries(await request.formData()) as AuthCredential;

		const dat = zValidate(AuthCredentialSchema, { email, password });
		if (dat instanceof Error) {
			const res = Dto.ReturnError(`Username or password is invalid`, dat);
			console.error(res);
			return {
				result: res,
				toast: new ToastInfo('Form Invalid.', {
					description: 'Username or password is invalid'
				}).Dto()
			};
		}

		try {
			const opt: AuthOption = {
				'hash-method': 'AES'
			};
			const token = await NewAuthUsecase.onSignUp(dat, opt);
			const user = await NewAuthUsecase.getUserData(token.result.access_token);
			if (user.status_code !== 200) {
				console.error(user);
				return {
					result: user,
					toast: new ToastInfo('Form Invalid.', {
						description: 'Something went wrong, please try again.'
					}).Dto()
				};
			}

			cookies.set('user', JSON.stringify(user.result), cookiesConfig);
			cookies.set('token', JSON.stringify(token.result), cookiesConfig);

			return {
				headers: {
					'set-cookie': `session=; Max-Age=0; Path=/; HttpOnly` // clear the session cookie
				},
				result: Dto.ReturnSuccess(`User has been registered`),
				toast: new ToastInfo('Action Successfully', {
					description: new Date().toLocaleString('th-US')
				}).Dto()
			};
		} catch (error) {
            const res = Dto.ReturnError(`Failed to Authentication, please try again.`, error as AxiosError);
            console.error(res);
            return {
                result: res,
                toast: new ToastInfo('Internal Server Error', {
                    description: 'Something went wrong, please try again.'
                }).Dto()
            };
		}
	}
};
