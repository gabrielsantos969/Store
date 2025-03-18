import { z } from "zod";

export const UpdateCustomerSchema = z.object({
    phone: z.string().min(11).optional()
});

export type UpdateCustomerDto = z.infer<typeof UpdateCustomerSchema>;