import { z } from "zod";

export const CreateAddressSchema = z.object({
    street: z.string(),
    number: z.string(),
    complement: z.string().optional(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string(),
    isDefault: z.boolean()
});

export type CreateAddressDto = z.infer<typeof CreateAddressSchema>;