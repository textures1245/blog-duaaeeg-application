import type { AxiosError, AxiosResponse } from 'axios';
import { APIGateway, headerWithToken, type HeaderConfig } from '../../..';
import type { TFile, IFileHandlerGateway } from '$lib/internal/model/auth/domains/file';

export default class APIFileGateway extends APIGateway implements IFileHandlerGateway {
	constructor(baseURL?: string) {
		super(baseURL);
	}

	public async getFiles(
		token: string,
		headerWithTokenConn?: HeaderConfig
	): Promise<AxiosResponse<TFile[]>> {
		try {
			return this.client.get(
				`/get-files`,
				headerWithToken(token, {
					...headerWithTokenConn
				})
			);
		} catch (error: unknown) {
			throw new Error(`Failed to get user data: ${(error as AxiosError).message}`);
		}
	}

	public async uploadFile(
		req: TFile,
		token: string,
		headerWithTokenConn?: HeaderConfig
	): Promise<AxiosResponse<TFile>> {
		try {
			const res = this.client.post(
				`/upload`,
				req,
				headerWithToken(token, {
					'Content-Type': 'multipart/form-data',
					...headerWithTokenConn
				})
			);
			return res;
		} catch (error: unknown) {
			throw new Error(`Failed to update user profile: ${(error as AxiosError).message}`);
		}
	}
}
