import type { AxiosResponse } from 'axios';
import z from 'zod';
import type { DtoResponded } from '../..';
import type { User } from './user';

export const AuthCredentialSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});

export type AuthCredential = z.infer<typeof AuthCredentialSchema>;

export type UserClaims = {
	user_uuid: string;
	email: string;
};

export type UserToken = {
	access_token: string;
	created_at: string;
	updated_at: string;
};

export type AuthOption = {
	'hash-method': 'AES';
};

export interface TAuthHandlerGateway<T = AuthCredential> {
	signUp(data: T, opt?: AuthOption): Promise<AxiosResponse<UserToken>>;
	signIn(data: T, opt?: AuthOption): Promise<AxiosResponse<UserToken>>;
	getUserClaims(token: string): Promise<AxiosResponse<UserClaims>>;
}

export interface TAuthUsecase<T = AuthCredential> {
	onSignUp(data: T, opt?: AuthOption): Promise<DtoResponded<UserToken>>;
	onSignIn(data: T, opt?: AuthOption): Promise<DtoResponded<UserToken>>;
	getUserData(token: string): Promise<DtoResponded<User>>;
}
