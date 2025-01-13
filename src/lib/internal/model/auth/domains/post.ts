import type { HeaderConfig } from '$lib/internal/adapters/handler';
import type { DtoResponded, FetchPostOptReq } from '$lib/internal/model';
import type { User } from './user';
import type { UserProfile } from '$lib/internal/model/auth/domains/user';

export type PostReqDat = {
	title: string;
	content: string;
	published: boolean;
	src_type: 'MARKDOWN_URL' | 'MARKDOWN_FILE' | 'CONTENT';
	category: {
		name: string;
	};
	tags: {
		tags: string[];
	};
	img_banner_url?: string;
};

export type PostResDat = {
	uuid: string;
	img_banner_url?: string;
	user?: PostUser;
	title: string;
	source: string;
	published: boolean;
	src_type: string;
	published_post_uuid: string;
	post_uuid: string;
	category: PostCategoryResDat;
	tags: {
		tags: string[];
	};
	comments: CommentModel[];
	like: LikeModel[];
	created_at: string;
	update_at: string;
};

export type PostWithTagCateResDat = {
	post: PostResDat;
	category: PostCategoryResDat;
	tags: PostTagResDat;
};

export type PostCategoryResDat = {
	id: number;
	name: string;
};

type PostUser = Pick<User, 'uuid' | 'email'> & { user_profile: PostUserProfileUser };
type PostUserProfileUser = Pick<UserProfile, 'first_name' | 'last_name' | 'profile_picture'>;

interface PostTagResDat {
	tags: string[];
}

export type CommentModel = {
	uuid: string;
	user_uuid: string;
	comment: string;
	post_uuid: string;
	created_at: string;
	update_at: string;
};

export type LikeModel = {
	uuid: string;
	user_uuid: string;
	post_uuid: string;
	created_at: string;
};

export interface IPostHandlerGateway {
	onCreateNewPost(
		userUuid: string,
		req: PostReqDat,
		token: string,
		headerConn?: HeaderConfig
	): Promise<DtoResponded<PostResDat>>;
	onFetchPostByUUID(
		uuid: string,
		token: string,
		headerConn?: HeaderConfig
	): Promise<DtoResponded<PostResDat>>;
	onFetchPublisherPosts(
		opts: FetchPostOptReq,
		token: string,
		headerConn?: HeaderConfig
	): Promise<DtoResponded<PostResDat[]>>;
	onFetchOwnerPosts(
		userUuid: string,
		headerConn?: HeaderConfig
	): Promise<DtoResponded<PostResDat[]>>;
	onDeletePostByUUID(
		userUuid: string,
		postUuid: string,
		token: string,
		headerConn?: HeaderConfig
	): Promise<void>;
}
