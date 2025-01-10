import { CookiesJsonParser } from '$lib/internal/utils/cookies';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { NewUserUsecase, NewPostHandlerGateway } from '$lib/internal/usecases';

import type { User } from '$lib/internal/model/auth/domains/user';
import type { PostResDat } from '$lib/internal/model/auth/domains/post';

export const load: PageServerLoad = async ({ cookies }) => {
	try {
		const { user, user_token } = CookiesJsonParser(cookies, 'user', 'user_token');
		if (!user.user_profile.created_at) {
			throw redirect(307, `/user-profile/${user.uuid}`);
		}

		let users: User[] = [];
		let posts: PostResDat[] = [];

		// fetch users
		const res = await NewUserUsecase.onGetUsers(user_token.access_token);
		if (res.status_code !== 200) {
			console.error(res);
			throw error(res.status_code, res.message);
		}
		users = res.result;

		const postRes = await NewPostHandlerGateway.onFetchPublisherPosts(
			{
				page: 0,
				limit: 10
			},
			user_token.access_token
		);
		if (postRes.status_code !== 200) {
			console.error(postRes);
			throw error(postRes.status_code, postRes.message);
		}
		posts = postRes.result;
		return {
			user,
			users,
			posts
		};
	} catch (err) {
		if (err instanceof Error && err.message === 'Cookie not found') {
			throw redirect(307, `/auth`);
		}
		console.error(err);
		throw error(500, 'Failed to get data, please try again.');
	}
};
