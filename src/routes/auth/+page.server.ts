import type { Actions, PageServerLoad } from './$types';
import { AuthCredentialSchema, type AuthCredential } from '$lib/internal/model/auth/domains/auth';
import { zValidate } from '$lib/internal/utils/validation';
import { NewAuthUsecase } from '$lib/internal/usecases';
import { Dto } from '$lib/internal/model';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		// status: 302,
		// headers: {
		// 	location: '/auth'
		// }
	};
};

export const actions: Actions = {
	signUp: async ({ request }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as AuthCredential;

		const dat = zValidate(AuthCredentialSchema, { email, password });
		if (dat instanceof Error) {
			const res = Dto.ReturnError(`Username or password is invalid`, dat);
			console.error(res);
			return fail(res.status_code, { ...res });
		}

		const res = await NewAuthUsecase.onSignUp(dat);
		return res;
	},

	signIn: async ({ request }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as AuthCredential;

		const dat = zValidate(AuthCredentialSchema, { email, password });
		if (dat instanceof Error) {
			const res = Dto.ReturnError(`Username or password is invalid`, dat);
			console.error(res);
			return fail(res.status_code, { ...res });
		}

		const res = await NewAuthUsecase.onSignIn(dat);
		console.log(res);
		return res;
	}
};
