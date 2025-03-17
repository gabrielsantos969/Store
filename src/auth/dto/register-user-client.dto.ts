import { z } from "zod";

export const RegisterUserClientSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phone: z.string().min(11)
});

export type RegisterUserClientDto = z.infer<typeof RegisterUserClientSchema>;