/**
 * Service injection for the outgoing API gateway adapter.
 */

import type { AxiosInstance } from 'axios';
import axios from 'axios';

// const headerConfigAllowed = {
// 	role: 'ADMIN'
// };

export type HeaderConfig = {
	role?: 'ADMIN';
	'fetch-mode'?: 'WITH_PASSWORD';
} & Record<string, string>;

export const headerWithToken = (token: string, opt?: HeaderConfig) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
			...opt
		}
	};
};

export class APIGateway {
	public readonly client: AxiosInstance;
	constructor(baseURL?: string) {
		this.client = axios.create({
			baseURL: this.validateBaseURL(baseURL)
		});
	}

	private validateBaseURL(baseURL: string | undefined): string {
		try {
			return new URL(baseURL || '').href;
		} catch (error: unknown) {
			throw new Error(`Invalid base URL '${baseURL}' given`);
		}
	}
}
