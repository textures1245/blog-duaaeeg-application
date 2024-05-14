import type { AuthCredential, TAuthHandlerGateway } from '$lib/internal/model/auth/domains/auth';
import type { AxiosError, AxiosResponse } from 'axios';
// import axios, { AxiosError } from 'axios';
import { APIGateway } from '$lib/internal/adapters/handler';

// export type FetchParams = {
// 	/**
// 	 * Maximum number of entities to return.
// 	 * Note the underscore prefix required by Typicode API.
// 	 */
// 	_limit: number;
// };

export default class APIAuthGateway extends APIGateway implements TAuthHandlerGateway {
	constructor(baseURL?: string) {
		super(baseURL);
	}

	public async signUp(data: AuthCredential): Promise<AxiosResponse> {
		try {
			return this.client.post('/auth/signup', data);
		} catch (error: unknown) {
			const axiosError = error as AxiosError;
			throw new Error(`Failed to sign up: ${axiosError.message}`);
		}
	}

	public async signIn(data: AuthCredential): Promise<AxiosResponse> {
		try {
			return this.client.post('/auth/signin', data);
		} catch (error: unknown) {
			const axiosError = error as AxiosError;
			throw new Error(`Failed to sign in: ${axiosError.message}`);
		}
	}
}
