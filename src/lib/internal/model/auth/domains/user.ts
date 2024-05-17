import type { AxiosResponse } from 'axios';
import type { DtoResponded } from '../..';
import type { UserClaims } from './auth';
import type { ProfileForm } from '../../../../../routes/user-profile/[id]/ProfileForm.svelte';

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
	getUser(req: DtoResponded<UserClaims>, token: string): Promise<AxiosResponse<User>>;
	getUsers(token: string, fetchMode?: 'WITH_PASSWORD'): Promise<AxiosResponse<User[]>>;
	updateUserProfile(
		req: ProfileForm,
		token: string,
		userUuid: string
	): Promise<AxiosResponse<UserProfile>>;
}

export interface TUserUsecase {
	onGetUserData(req: DtoResponded<UserClaims>, token: string): Promise<DtoResponded<User>>;
	onUpdateUserProfile(
		req: ProfileForm,
		token: string,
		userUuid: string
	): Promise<DtoResponded<UserProfile>>;
	onGetUsers(token: string, fetchMode?: 'WITH_PASSWORD'): Promise<DtoResponded<User[]>>;
}
