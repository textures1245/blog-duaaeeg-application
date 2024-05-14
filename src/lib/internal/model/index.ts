import type { AxiosResponse } from 'axios';

export interface DtoResponded<T> {
	status: string;
	status_code: number;
	message: string;
	result: T;
}

export class Dto {
	constructor() {}

	public static GetResponse<T>(data: AxiosResponse<T>): DtoResponded<T> {
		return data.data as DtoResponded<T>;
	}
}
