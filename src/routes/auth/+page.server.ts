import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { AuthCredentialSchema, type AuthCredential } from "$lib/internal/domains/auth";
import { zValidate } from "$lib/internal/utils/validation";


export const load: PageServerLoad = async ({  }) => {
    return {
        status: 302,
        headers: {
            location: '/auth'
        }
    }
}


export const actions: Actions = {
    signUp: async ({ request, params }) => {
        const { email, password } = Object.fromEntries(await request.formData()) as AuthCredential;

        const dat = zValidate(AuthCredentialSchema, { email, password });

        

    }
}
