import z from 'zod';

export const AuthCredentialSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8), 
}) 

export type AuthCredential = z.infer<typeof AuthCredentialSchema>;
