// // src/hooks.ts
// import { redirect, type Handle } from '@sveltejs/kit';

// export const handle: Handle = async ({ resolve, event }) => {
// 	if (
// 		!sessionStorage.getItem('token') &&
// 		event.url.pathname !== '/auth' &&
// 		event.url.pathname !== '/'
// 	) {
// 		throw redirect(300, '/auth');
// 	}

// 	const response = await resolve(event);

// 	return response;
// };
