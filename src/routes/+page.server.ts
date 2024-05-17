import { Dto } from '$lib/internal/model';
import { CookiesJsonParser } from '$lib/internal/utils/cookies';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	try {
		const { user } = CookiesJsonParser(cookies, 'user');
		if (!user.user_profile.created_at) {
			return new Response(null, {
				status: 302,
				headers: {
					location: `/user-profile/${user.uuid}`
				}
			});
		}
		return {
			user
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
