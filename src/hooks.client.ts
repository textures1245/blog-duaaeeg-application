// src/hooks.ts
import type { User } from '$lib/internal/model/auth/domains/user';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ resolve, event }) => {
	const token = event.cookies.get('user_token');
	if (token == '' || !token) {
		if (event.url.pathname !== '/auth') {
			console.warn('No token found, redirecting to /auth');
			throw redirect(307, '/auth');
		}
	}

	const tokenData = JSON.parse(token || '{}') as { expires_at: string };
	if (new Date(tokenData.expires_at) < new Date()) {
		console.warn('Token expired, delete cookies and redirecting to /auth');
		event.cookies.delete('user_token', { path: '/' });
		event.cookies.delete('user', { path: '/' });
		throw redirect(300, '/auth');
	}

	const rawUser = event.cookies.get('rawUser');
	if (rawUser == '' || !rawUser) {
		return resolve(event);
	}
	if ((rawUser as unknown as User).created_at == '') {
		throw redirect(307, `/user-profile/${(rawUser as unknown as User).uuid}`);
	}

	return resolve(event);
};
