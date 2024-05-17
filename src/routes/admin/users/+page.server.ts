import { NewUserUsecase } from '$lib/internal/usecases';
import { CookiesJsonParser } from '$lib/internal/utils/cookies';
import { fail } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { Dto } from '$lib/internal/model';
import type { AxiosError } from 'axios';
import type { UserWithPwd } from './+page.svelte';


export const load: PageServerLoad = async ({ cookies }) => {
	// get users data
	try {
		const { token } = CookiesJsonParser(cookies, 'token');
		const res = await NewUserUsecase.onGetUsers(token.access_token, 'WITH_PASSWORD');
		console.log(res.result);
		if (res.status_code !== 200) {
			console.error(res);
			return fail(res.status_code, { message: res.message });
		}

		const users = res.result as UserWithPwd[];

		return {
        users
		};
	} catch (error) {
		const res = Dto.ReturnError(`Failed to get users data, please try again.`, error as AxiosError);
		console.error(res.message);
		return fail(res.status_code, { message: res.message });
	}
};
