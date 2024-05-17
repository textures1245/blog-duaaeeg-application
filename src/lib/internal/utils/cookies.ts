import type { Cookies } from '@sveltejs/kit';
import type { CookieSerializeOptions } from 'cookie';
import type { UserToken } from '../model/auth/domains/auth';
import type { User } from '../model/auth/domains/user';

type TypeMap = {
	token: UserToken;
	user: User;
	// Add more keys and types as needed
};

export const cookiesConfig: CookieSerializeOptions & {
	path: string;
	sameSite: 'strict' | 'lax' | 'none' | undefined;
} = {
	path: '/',
	httpOnly: true,
	sameSite: 'strict',
	secure: process.env.NODE_ENV === 'production',
	maxAge: 60 * 60 * 24 * 7 // 1 week
};

export function CookiesJsonParser<K extends keyof TypeMap>(
	cookies: Cookies,
	...cKeys: K[]
): { [J in K]: TypeMap[J] } {
	if (cKeys.length < 1 || !cookies) {
		throw new Error('No cookies or json provided');
	}

	const dict: Record<string, K> = {};
	for (const j of cKeys) {
		const res = cookies.get(j);
		if (!res) {
			throw new Error('Cookie not found');
		}
		dict[j] = JSON.parse(res);
	}

	return dict as unknown as { [J in K]: TypeMap[J] };
}

// export function CookiesJsonParser<T extends CookiesJsonParserType>(
// 	cookies: Cookies,
// 	...json: string[]
// ): Record<string, T> {
// 	if (json.length < 1 || !cookies) {
// 		throw new Error('No cookies or json provided');
// 	}

// 	const dict: Record<string, T> = {};

// 	for (const j of json) {
// 		const res = cookies.get(j);
// 		if (!res) {
// 			throw new Error('Cookie not found');
// 		}
// 		dict[j] = JSON.parse(res);
// 	}

// 	return dict;
// }
