import type { AxiosResponse } from 'axios';
import type { DtoResponded } from '../..';
import type { UserClaims } from './auth';
import type { ProfileForm } from '../../../../../routes/user-profile/[id]/ProfileForm.svelte';
import type { HeaderConfig } from '$lib/internal/adapters/handler';

export type UserProfile = {
	first_name: string;
	last_name: string;
	bio: string;
	profile_picture: string;
	created_at: string | Date;
	updated_at: string | Date;
};

export type User = {
	uuid: string;
	email: string;
	user_profile: UserProfile;
	subscriber: unknown[];
	subscribing: unknown[];
	created_at: string | Date;
	updated_at: string | Date;
};

export interface TUserHandlerGateway {
	getUser(
		req: DtoResponded<UserClaims>,
		token: string,
		headerConn?: HeaderConfig
	): Promise<AxiosResponse<User>>;
	getUsers(
		token: string,
		fetchMode?: 'WITH_PASSWORD',
		headerConn?: HeaderConfig
	): Promise<AxiosResponse<User[]>>;
	updateUserProfile(
		req: ProfileForm,
		token: string,
		userUuid: string
	): Promise<AxiosResponse<UserProfile>>;
	deleteUser(
		userUuid: string,
		token: string,
		headerConn?: HeaderConfig
	): Promise<AxiosResponse<void>>;
}

export interface TUserUsecase {
	onGetUserData(
		req: DtoResponded<UserClaims>,
		token: string,
		headerConn?: HeaderConfig
	): Promise<DtoResponded<User>>;
	onUpdateUserProfile(
		req: ProfileForm,
		token: string,
		userUuid: string,
		headerConn?: HeaderConfig
	): Promise<DtoResponded<UserProfile>>;
	onGetUsers(token: string, fetchMode?: 'WITH_PASSWORD'): Promise<DtoResponded<User[]>>;
	onDeleteUser(
		userUuid: string,
		token: string,
		headerConn?: HeaderConfig
	): Promise<DtoResponded<void>>;
}
