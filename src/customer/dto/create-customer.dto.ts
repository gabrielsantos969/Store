import { z } from "zod";

export const CreateCustomerSchema = z.object({
    phone: z.string().min(11)
});

export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;