import type { TUserHandlerGateway, User, UserProfile } from '$lib/internal/model/auth/domains/user';
import type { AxiosError, AxiosResponse } from 'axios';
import { APIGateway } from '../../..';
import type { UserClaims } from '$lib/internal/model/auth/domains/auth';
import type { ProfileForm } from '../../../../../../../routes/user-profile/[id]/ProfileForm.svelte';
import type { DtoResponded } from '$lib/internal/model';

const header = (token: string, opt?: object) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
			...opt
		}
	};
};
export default class APIUserGateway extends APIGateway implements TUserHandlerGateway {
	constructor(baseURL?: string) {
		super(baseURL);
	}

	public async getUser(req: DtoResponded<UserClaims>, token: string): Promise<AxiosResponse<User>> {
		try {
			return this.client.get(`/${req.result.user_uuid}`, header(token));
		} catch (error: unknown) {
			throw new Error(`Failed to get user data: ${(error as AxiosError).message}`);
		}
	}

	public async updateUserProfile(
		req: ProfileForm,
		token: string,
		userUuid: string
	): Promise<AxiosResponse<UserProfile>> {
		try {
			const res = this.client.post(
				`/${userUuid}/profile`,
				req,
				header(token, {
					'Content-Type': 'multipart/form-data'
				})
			);
			return res;
		} catch (error: unknown) {
			throw new Error(`Failed to update user profile: ${(error as AxiosError).message}`);
		}
	}

	public async getUsers(
		token: string,
		fetchMode?: 'WITH_PASSWORD'
	): Promise<AxiosResponse<User[]>> {
		try {
			if (fetchMode) {
				return this.client.get(
					'/',
					header(token, {
						'fetch-mode': fetchMode
					})
				);
			}
			return this.client.get('/', header(token));
		} catch (error: unknown) {
			throw new Error(`Failed to get users data: ${(error as AxiosError).message}`);
		}
	}
}
