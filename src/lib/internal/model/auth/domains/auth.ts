import type { AxiosResponse } from 'axios';
import z from 'zod';
import type { DtoResponded } from '../..';

export const AuthCredentialSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});

export type AuthCredential = z.infer<typeof AuthCredentialSchema>;

export interface TAuthHandlerGateway<T = AuthCredential> {
	signUp(data: T): Promise<AxiosResponse>;
	signIn(data: T): Promise<AxiosResponse>;
}

export interface TAuthUsecase<T = AuthCredential> {
	onSignUp(data: T): Promise<DtoResponded<T>>;
	onSignIn(data: T): Promise<DtoResponded<T>>;
}
