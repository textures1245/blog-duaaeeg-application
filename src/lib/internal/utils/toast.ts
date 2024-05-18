import { toast } from 'svelte-sonner';
import type { ExternalToast } from 'svelte-sonner';

type ToastDto = {
	message: string;
	data?: ExternalToast;
};

export class ToastInfo {
	message: string;
	data?: object;
	constructor(message: string, data?: ExternalToast) {
		this.message = message;
		this.data = data;
	}

	public Dto(): ToastDto {
		return {
			message: this.message,
			data: this.data
		};
	}

	public static Run(tDat: ToastDto) {
		toast(tDat.message, tDat.data);
	}
}
