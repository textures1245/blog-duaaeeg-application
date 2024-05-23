import type { HeaderConfig } from '$lib/internal/adapters/handler';
import type { AxiosResponse } from 'axios';

export type TFile = {
	id: number;
	file_name: string;
	file_data: string;
	file_type: string;
	created_at: string;
	update_at: string;
};

export interface IFileHandlerGateway {
	getFiles(token: string, header?: HeaderConfig): Promise<AxiosResponse<TFile[]>>;
	uploadFile(file: TFile, token: string, header?: HeaderConfig): Promise<AxiosResponse<TFile>>;
}

export interface IFileUsecase {
	onGetFiles(token: string, header?: HeaderConfig): Promise<TFile[]>;
	onUploadFile(file: TFile, token: string, header?: HeaderConfig): Promise<TFile>;
}
