import type { AuthCredential } from "$lib/internal/domains/auth";
import type { AxiosInstance, AxiosResponse } from 'axios';
import axios, { AxiosError } from 'axios';
import { APIGateway } from "$lib/internal/adapters/handler"

// export type FetchParams = {
// 	/**
// 	 * Maximum number of entities to return.
// 	 * Note the underscore prefix required by Typicode API.
// 	 */
// 	_limit: number;
// };

export interface AuthHandlerGateway<T = AuthCredential> {
    signUp(data: T):  Promise<AxiosResponse<any, any>>,
    signIn(data: T):  Promise<AxiosResponse<any, any>>,
}

export class APIAuthGateway extends APIGateway implements AuthHandlerGateway {

    constructor(baseURL?: string) {
        super(baseURL);
    }

    public async signUp(data: AuthCredential): Promise<AxiosResponse<any, any>> {
        try {
            return this.client.post('/auth/signup', data);
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            throw new Error(`Failed to sign up: ${axiosError.message}`);
        }
    }

    public async signIn(data: AuthCredential): Promise<AxiosResponse<any, any>> {
        try {
            return this.client.post('/auth/signin', data);
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            throw new Error(`Failed to sign in: ${axiosError.message}`);
        }
    }
}