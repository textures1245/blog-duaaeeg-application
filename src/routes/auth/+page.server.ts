import type { Actions, PageServerLoad } from './$types';
import {
	AuthCredentialSchema,
	type AuthCredential,
	type AuthOption
} from '$lib/internal/model/auth/domains/auth';
import { zValidate } from '$lib/internal/utils/validation';
import { NewAuthUsecase } from '$lib/internal/usecases';
import { Dto } from '$lib/internal/model';
import { fail, redirect, type Cookies } from '@sveltejs/kit';
import { cookiesConfig, CookiesJsonParser } from '$lib/internal/utils/cookies';
import { ToastInfo } from '$lib/internal/utils/toast';
import type { AxiosError } from 'axios';

function redirectToUserProfile(cookies: Cookies) {
	if (cookies.get('token')) {
		const { user } = CookiesJsonParser(cookies, 'user');
		if (!user.user_profile.created_at) {
			throw redirect(302, `/user-profile/${user.uuid}`);
		} else {
			throw redirect(302, `/`);
		}
	}
}

export const load: PageServerLoad = async ({ url, cookies }) => {
	if (url.searchParams.get('action') === 'logout') {
		cookies.delete('user', { path: '/', maxAge: 0 });
		cookies.delete('token', { path: '/', maxAge: 0 });
		return {
			status: 302,
			headers: {
				'set-cookie': `session=; Max-Age=0; Path=/; HttpOnly` // clear the session cookie
			}
		};
	}

	redirectToUserProfile(cookies);

	return {
		status: 200
	};
};

export const actions: Actions = {
	signUp: async ({ request, cookies }) => {
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
						description: 'Username or password is invalid'
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
				toast: new ToastInfo('Form Invalid.', {
					description: 'Username or password is invalid'
				}).Dto()
			};
		} catch (error) {
			console.error(error);
			const res = Dto.ReturnError(`Failed to Authentication, please try again.`, error as Error);
			return fail(res.status_code, { ...res });
		}
	},

	signIn: async ({ request, cookies }) => {
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
			const token = await NewAuthUsecase.onSignIn(dat, opt);
			console.log(token.result.access_token);
			const user = await NewAuthUsecase.getUserData(token.result.access_token);
			if (user.status_code !== 200) {
				console.error(user);
				return {
					result: user,
					toast: new ToastInfo('Internal Server Error.', {
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
				result: Dto.ReturnSuccess(`User had been logined`),
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
