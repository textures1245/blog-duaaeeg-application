import type { ProfileForm } from '../../../routes/user-profile/[id]/ProfileForm.svelte';
import type { HeaderConfig } from '../adapters/handler';
import type APIUserGateway from '../adapters/handler/user/http/v1/gateway';
import { Dto, type DtoResponded } from '../model';
import type { UserClaims } from '../model/auth/domains/auth';
import type { TUserUsecase, User, UserProfile } from '../model/auth/domains/user';

export default class UserUsecase implements TUserUsecase {
	public readonly gateway: APIUserGateway;
	constructor(g: APIUserGateway) {
		this.gateway = g;
	}

	public async onGetUserData(
		req: DtoResponded<UserClaims>,
		token: string
	): Promise<DtoResponded<User>> {
		if (!token || !req) {
			throw new Error('Request data is empty');
		}

		const response = await this.gateway.getUser(req, token);
		return Dto.GetResponse(response);
	}

	public async onUpdateUserProfile(
		req: ProfileForm,
		token: string,
		userUuid: string,
		headerConn?: HeaderConfig
	): Promise<DtoResponded<UserProfile>> {
		if (!req || !token || !userUuid) {
			throw new Error('Request data is empty');
		}

		const res = await this.gateway.updateUserProfile(req, token, userUuid, headerConn);
		return Dto.GetResponse(res);
	}

	public async onGetUsers(
		token: string,
		fetchMode?: 'WITH_PASSWORD'
	): Promise<DtoResponded<User[]>> {
		if (!token) {
			throw new Error('Request data is empty');
		}

		const response = await this.gateway.getUsers(token, fetchMode);
		return Dto.GetResponse(response);
	}

	public async onDeleteUser(userUuid: string, token: string, headerConn?: HeaderConfig): Promise<DtoResponded<void>> {
		if (!token) {
			throw new Error('Request data is empty');
		}

		const response = await this.gateway.deleteUser(userUuid,  token, headerConn);
		return Dto.GetResponse(response);
	}
}
