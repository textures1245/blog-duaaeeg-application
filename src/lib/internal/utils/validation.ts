import type { z } from 'zod';

export function zValidate<Z extends z.AnyZodObject>(
	zSchema: Z,
	data: unknown
): ReturnType<Z['parse']> | Error {
	const result = zSchema.safeParse(data);

	if (!result.success) {
		return new Error(`Error while parsing data schema: ${result.error.message}`);
	}

	return result.data as ReturnType<Z['parse']>;
}
