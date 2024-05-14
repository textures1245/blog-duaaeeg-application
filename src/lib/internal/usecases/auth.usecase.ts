import type APIAuthGateway from '../adapters/handler/auth/http/v1/gateway';
import { Dto, type DtoResponded } from '../model';
import type { AuthCredential, TAuthUsecase } from '../model/auth/domains/auth';

export default class AuthUsecase implements TAuthUsecase {
	public readonly gateway: APIAuthGateway;
	constructor(g: APIAuthGateway) {
		this.gateway = g;
	}

	public async onSignUp(data: AuthCredential): Promise<DtoResponded<AuthCredential>> {
		if (!data) {
			throw new Error('Response data is empty', data);
		}

		const response = await this.gateway.signUp(data);
		return Dto.GetResponse<AuthCredential>(response);
	}
	public async onSignIn(data: AuthCredential): Promise<DtoResponded<AuthCredential>> {
		if (!data) {
			throw new Error('Response data is empty', data);
		}

		const response = await this.gateway.signIn(data);
		return Dto.GetResponse<AuthCredential>(response);
	}
}
