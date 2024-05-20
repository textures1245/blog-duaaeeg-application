import type {
	AuthCredential,
	AuthOption,
	TAuthHandlerGateway,
	UserClaims
} from '$lib/internal/model/auth/domains/auth';
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

	public async signUp(data: AuthCredential, opt?: AuthOption): Promise<AxiosResponse> {
		try {
			if (opt) {
				return this.client.post('/register', data, {
					headers: {
						'Content-Type': 'multipart/form-data',
						...opt
					}
				});
			}
			return this.client.post('/register', data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
		} catch (error: unknown) {
			const axiosError = error as AxiosError;
            throw new Error(`Failed to sign up: ${axiosError.message}`);
		}
	}

	public async signIn(data: AuthCredential, opt?: AuthOption): Promise<AxiosResponse> {
		try {
			if (opt) {
				return this.client.post('/login', data, {
					headers: {
						'Content-Type': 'multipart/form-data',
						...opt
					}
				});
			}

			return this.client.post('/login', data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
		} catch (error: unknown) {
			console.log(error);
			const axiosError = error as AxiosError;
			throw new Error(`Failed to sign in: ${axiosError.message}`);
		}
	}

	public async getUserClaims(token: string): Promise<AxiosResponse<UserClaims>> {
		try {
			return this.client.get('/user-claim', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
		} catch (error: unknown) {
			throw new Error(`Failed to get user claims: ${(error as Error).message}`);
		}
	}
}
