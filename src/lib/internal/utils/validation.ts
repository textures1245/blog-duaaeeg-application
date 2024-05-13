import type { z } from "zod";

export function zValidate<Z extends z.AnyZodObject>(zSchema: Z, data: any): ReturnType<Z["parse"]> {
    const result = zSchema.safeParse(data);

	if (!result.success) {
		throw new Error(`Error while parsing data schema: ${result.error.message}`);
	}

	return result.data as ReturnType<Z["parse"]>;
}