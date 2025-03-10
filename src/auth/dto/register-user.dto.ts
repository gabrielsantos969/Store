import { z } from "zod";

export const RegisterUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
});

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;