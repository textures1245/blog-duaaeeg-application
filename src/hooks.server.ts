// src/hooks.ts
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ resolve, event }) => {
	const token = event.cookies.get('token');
	if (!token && event.url.pathname !== '/auth' && event.url.pathname !== '/') {
		throw redirect(300, '/auth');
	}

	return resolve(event);
};
