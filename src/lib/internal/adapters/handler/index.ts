/**
 * Service injection for the outgoing API gateway adapter.
 */

import type { AxiosInstance } from "axios";
import axios from "axios";

export class APIGateway  {
    public readonly client: AxiosInstance;
	constructor(baseURL?: string) {
		this.client = axios.create({
			baseURL: this.validateBaseURL(baseURL)
		});
	}

    private validateBaseURL(baseURL: string | undefined): string {
		try {
			return new URL(baseURL || '').href;
		} catch (error: unknown) {
			throw new Error(`Invalid base URL '${baseURL}' given`);
		}
	}
}

export const gateway = new APIGateway("https://api.example.com/v1");
