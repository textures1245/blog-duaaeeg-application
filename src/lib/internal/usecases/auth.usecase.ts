import type APIAuthGateway from '../adapters/handler/auth/http/v1/gateway';
import type APIUserGateway from '../adapters/handler/user/http/v1/gateway';
import { Dto, type DtoResponded } from '../model';
import type { AuthCredential, TAuthUsecase, UserToken } from '../model/auth/domains/auth';
import type { User } from '../model/auth/domains/user';

export default class AuthUsecase implements TAuthUsecase {
	public readonly gateway: APIAuthGateway;
	public readonly userGateway: APIUserGateway;
	constructor(g: APIAuthGateway, uG: APIUserGateway) {
		this.userGateway = uG;
		this.gateway = g;
	}

	public async onSignUp(data: AuthCredential): Promise<DtoResponded<UserToken>> {
		if (!data) {
			throw new Error('Response data is empty', data);
		}

		const response = await this.gateway.signUp(data);
		return Dto.GetResponse<UserToken>(response);
	}
	public async onSignIn(data: AuthCredential): Promise<DtoResponded<UserToken>> {
		if (!data) {
			throw new Error('Response data is empty', data);
		}

		const response = await this.gateway.signIn(data);
		console.log(response.data);
		return Dto.GetResponse<UserToken>(response);
	}

	public async getUserData(token: string): Promise<DtoResponded<User>> {
		if (!token) {
            console.log("token :", token);
			throw new Error('Response data is empty');
		}

		const userClaim = await this.gateway.getUserClaims(token);
		console.log(userClaim);
		const response = await this.userGateway.getUser(Dto.GetResponse(userClaim), token);
		return Dto.GetResponse(response);
	}
}
