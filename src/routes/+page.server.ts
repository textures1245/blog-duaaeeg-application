import { Dto } from '$lib/internal/model';
import { CookiesJsonParser } from '$lib/internal/utils/cookies';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { NewUserUsecase } from '$lib/internal/usecases';
import type { User } from '$lib/internal/model/auth/domains/user';

export const load: PageServerLoad = async ({ cookies }) => {
	try {
		const { user, token } = CookiesJsonParser(cookies, 'user', 'token');
		if (!user.user_profile.created_at) {
			return new Response(null, {
				status: 302,
				headers: {
					location: `/user-profile/${user.uuid}`
				}
			});
		}

		// fetch users
		const res = await NewUserUsecase.onGetUsers(token.access_token);

		if (res.status_code !== 200) {
			console.error(res);
			return fail(res.status_code, { message: res.message });
		}

		const users = res.result as User[];

		return {
			user,
			users
		};
	} catch (error) {
		// check if user data has stored in cookies or it expired
		if (error instanceof Error && error.message === 'Cookie not found') {
			return {
				user: null
			};
		} else {
			const res = Dto.ReturnError(`Failed to get user data, please try again.`, error as Error);
			console.log(res);
			return fail(res.status_code, { ...res });
		}
	}
};
