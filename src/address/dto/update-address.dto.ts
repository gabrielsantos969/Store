import { z } from "zod";

export const UpdateAddressSchema = z.object({
    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipcode: z.string().optional(),
    isDefault: z.boolean().optional()
});

export type UpdateAddressDto = z.infer<typeof UpdateAddressSchema>;