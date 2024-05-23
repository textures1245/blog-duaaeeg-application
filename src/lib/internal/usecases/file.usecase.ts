import type { HeaderConfig } from '../adapters/handler';
import APIFileGateway from '../adapters/handler/file/http/v1/gateway';
import { Dto } from '../model';
import type { ITFileUsecase, TFile } from '../model/auth/domains/file';

export default class NewTFileUsecase implements ITFileUsecase {
	public readonly gateway: APIFileGateway;

	constructor(g: APIFileGateway) {
		this.gateway = g;
	}

	public async onGetTFiles(token: string, header?: HeaderConfig): Promise<TFile[]> {
		if (!token) {
			throw new Error('Response data is empty');
		}

		const data = await this.gateway.getFiles(token, header);
		return Dto.GetResponse<TFile[]>(data);
	}

	public async onUploadTFile(file: TFile, token: string, header?: HeaderConfig): Promise<TFile> {
		if (!file || !token) {
            throw new Error('Response data is empty');
        }
        
        const data = await this.gateway.uploadFile(file, token, header);
		return Dto.GetResponse<TFile>(data);
	}
}
