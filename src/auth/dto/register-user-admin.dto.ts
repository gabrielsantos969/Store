import { z } from "zod";

export const RegisterUserAdminSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
});

export type RegisterUserAdminDto = z.infer<typeof RegisterUserAdminSchema>;