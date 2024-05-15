import type { TUserHandlerGateway, User } from '$lib/internal/model/auth/domains/user';
import type { AxiosError, AxiosResponse } from 'axios';
import { APIGateway } from '../../..';
import type { UserClaims } from '$lib/internal/model/auth/domains/auth';
import type { DtoResponded } from '$lib/internal/model';

export default class APIUserGateway extends APIGateway implements TUserHandlerGateway {
	constructor(baseURL?: string) {
		super(baseURL);
	}

	public async getUser(req: DtoResponded<UserClaims>, token: string): Promise<AxiosResponse<User>> {
		try {
			return this.client.get(`/${req.result.user_uuid}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
		} catch (error: unknown) {
			throw new Error(`Failed to get user data: ${(error as AxiosError).message}`);
		}
	}
}
