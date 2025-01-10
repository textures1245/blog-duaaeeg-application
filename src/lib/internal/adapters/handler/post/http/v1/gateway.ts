import type {
	IPostHandlerGateway,
	PostReqDat,
	PostResDat
} from '$lib/internal/model/auth/domains/post';

import { APIGateway, headerWithToken, type HeaderConfig } from '$lib/internal/adapters/handler';
import type { DtoResponded, FetchPostOptReq } from '$lib/internal/model';
import axios from 'axios';

export default class PostHandlerGateway extends APIGateway implements IPostHandlerGateway {
	constructor(baseURL?: string) {
		super(baseURL);
	}

	public async onCreateNewPost(
		userUuid: string,
		req: PostReqDat,
		token: string,
		headerConn?: HeaderConfig
	): Promise<DtoResponded<PostResDat>> {
		try {
			const res = await this.client.post<DtoResponded<PostResDat>>(
				`/${userUuid}/post_form`,
				req,
				headerWithToken(token, {
					...headerConn
				})
			);
			return res.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw error.response?.data;
			}

			throw new Error(`Failed to create new post: ${(error as Error).message}`);
		}
	}

	public async onFetchPostByUUID(uuid: string, token: string): Promise<DtoResponded<PostResDat>> {
		try {
			const res = await this.client.get<DtoResponded<PostResDat>>(
				`/publish_posts/${uuid}`,
				headerWithToken(token)
			);
			return res.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw error.response?.data;
			}

			throw new Error(`Failed to fetch post by UUID: ${(error as Error).message}`);
		}
	}

	public async onFetchPublisherPosts(
		opts: FetchPostOptReq,
		token: string,
		headerConn?: HeaderConfig
	): Promise<DtoResponded<PostResDat[]>> {
		try {
			const res = await this.client.get<DtoResponded<PostResDat[]>>(`/publish_posts`, {
				params: opts,
				...headerWithToken(token, { ...headerConn })
			});
			return res.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw error.response?.data;
			}

			throw new Error(`Failed to fetch publisher posts: ${(error as Error).message}`);
		}
	}

	public async onFetchOwnerPosts(userUuid: string): Promise<DtoResponded<PostResDat[]>> {
		try {
			const res = await this.client.get<DtoResponded<PostResDat[]>>(`/${userUuid}/posts`);
			return res.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw error.response?.data;
			}

			throw new Error(`Failed to fetch owner posts: ${(error as Error).message}`);
		}
	}

	public async onDeletePostByUUID(
		userUuid: string,
		postUuid: string,
		token: string
	): Promise<void> {
		try {
			await this.client.delete(
				`/${userUuid}/post_form/${postUuid}?action=OWNER_DELETE_POST`,
				headerWithToken(token)
			);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw error.response?.data;
			}

			throw new Error(`Failed to delete post by UUID: ${(error as Error).message}`);
		}
	}
}
