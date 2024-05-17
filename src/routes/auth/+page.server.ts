import type { Actions, PageServerLoad } from './$types';
import { AuthCredentialSchema, type AuthCredential } from '$lib/internal/model/auth/domains/auth';
import { zValidate } from '$lib/internal/utils/validation';
import { NewAuthUsecase } from '$lib/internal/usecases';
import { Dto } from '$lib/internal/model';
import { fail } from '@sveltejs/kit';
import { cookiesConfig } from '$lib/internal/utils/cookies';

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
};

export const actions: Actions = {
	signUp: async ({ request, cookies }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as AuthCredential;

		const dat = zValidate(AuthCredentialSchema, { email, password });
		if (dat instanceof Error) {
			const res = Dto.ReturnError(`Username or password is invalid`, dat);
			console.error(res);
			return fail(res.status_code, { ...res });
		}

		try {
			const token = await NewAuthUsecase.onSignUp(dat);
			const user = await NewAuthUsecase.getUserData(token.result.access_token);
			if (user.status_code !== 200) {
				console.error(user);
				return fail(user.status_code, { ...user });
			}

			cookies.set('user', JSON.stringify(user.result), cookiesConfig);
			cookies.set('token', JSON.stringify(token.result), cookiesConfig);

			console.log(cookies.get('user'), cookies.get('token'));

			return Dto.ReturnSuccess(`User has been registered`);
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
			return fail(res.status_code, { ...res });
		}

		try {
			const token = await NewAuthUsecase.onSignIn(dat);
			console.log(token.result.access_token);
			const user = await NewAuthUsecase.getUserData(token.result.access_token);
			if (user.status_code !== 200) {
				console.error(user);
				return fail(user.status_code, { ...user });
			}

			cookies.set('user', JSON.stringify(user.result), cookiesConfig);
			cookies.set('token', JSON.stringify(token.result), cookiesConfig);

			console.log(cookies.get('user'), cookies.get('token'));

			return Dto.ReturnSuccess(`User has been login`);
		} catch (error) {
			console.error(error);
			const res = Dto.ReturnError(`Failed to Authentication, please try again.`, error as Error);
			return fail(res.status_code, { ...res });
		}
	}
};
