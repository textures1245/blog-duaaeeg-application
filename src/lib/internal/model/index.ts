import { type AxiosResponse } from 'axios';

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

	public static ReturnError<T extends Error>(message: string, data: T): DtoResponded<string> {
		return {
			status: 'Error, InternalServerError',
			status_code: 500,
			message: message,
			result: data.message
		};
	}
}
