import type { PostResDat } from '$lib/internal/model/auth/domains/post';
import { NewUserUsecase, NewPostHandlerGateway } from '$lib/internal/usecases';
import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { CookiesJsonParser } from '$lib/internal/utils/cookies';
import { AxiosError } from 'axios';

export const load: PageServerLoad = async ({ cookies, params }) => {
	try {
		const { user_token } = CookiesJsonParser(cookies, 'user_token');

		let post: PostResDat;

		// fetch
		const res = await NewUserUsecase.onGetUsers(user_token.access_token);
		if (res.status_code !== 200) {
			console.error(res);
			return error(res.status_code, res.message);
		}

		const postRes = await NewPostHandlerGateway.onFetchPostByUUID(
			params.id,
			user_token.access_token
		);
		if (postRes.status_code !== 200) {
			console.error(postRes);
			return error(postRes.status_code, postRes.message);
		}
		// eslint-disable-next-line prefer-const
		post = postRes.result;
		return {
			post
		};
	} catch (err) {
		if (err instanceof Error && err.message === 'Cookie not found') {
			throw redirect(307, `/auth`);
		}
		console.error(err instanceof AxiosError ? err.response : err);
		return error(500, 'Failed to get data, please try again.');
	}
};
