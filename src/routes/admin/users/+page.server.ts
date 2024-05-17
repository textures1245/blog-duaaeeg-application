import { NewUserUsecase } from '$lib/internal/usecases';
import { CookiesJsonParser } from '$lib/internal/utils/cookies';
import { fail } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { Dto } from '$lib/internal/model';
import type { AxiosError } from 'axios';
import type { UserWithPwd } from './+page.svelte';
import { AEWDecryption } from '$lib/internal/utils/encryption';
import { AEW_KEY } from '$env/static/private';

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
				const keyBuffer = Buffer.alloc(32)
                keyBuffer.write(AEW_KEY);
				user.password = AEWDecryption(user.password, keyBuffer);
				return user;
			});
		}
		console.log(users);

		return {
			users
		};
	} catch (error) {
		const res = Dto.ReturnError(`Failed to get users data, please try again.`, error as AxiosError);
		console.error(res);
		return fail(res.status_code, { message: res });
	}
};
