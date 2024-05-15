import type { AxiosResponse } from 'axios';
import type { DtoResponded } from '../..';
import type { UserClaims } from './auth';

type UserProfile = {
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
	created_at: string | Date;
	updated_at: string | Date;
};

export interface TUserHandlerGateway {
	getUser(req: DtoResponded<UserClaims>, token: string): Promise<AxiosResponse<User>>;
}

export interface TUserUsecase {
	onGetUserData(token: string): Promise<DtoResponded<User>>;
}
