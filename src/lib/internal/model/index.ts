import { AxiosError, type AxiosResponse } from 'axios';

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

	public static ReturnError<T extends AxiosError | Error>(
		message: string,
		data: T
	): DtoResponded<AxiosError['response'] | string> {
		if (data instanceof Error) {
			return {
				status: 'Error, InternalServerError',
				status_code: 500,
				message: message,
				result: data.message
			};
		}

		return {
			status: 'Error, InternalServerError',
			status_code: 500,
			message: message,
			result: (data as AxiosError).response
		};
	}

	public static ReturnSuccess<T>(message: string, data?: Partial<T>): DtoResponded<T> {
		return {
			status: 'Success',
			status_code: 200,
			message: message,
			result: data as T
		};
	}
}
