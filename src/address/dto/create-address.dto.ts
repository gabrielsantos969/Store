import { z } from "zod";

export const CreateAddressSchema = z.object({
    street: z.string(),
    number: z.string(),
    complement: z.string().optional(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string(),
    isDefaul: z.boolean(),
    customerId: z.string()
});

export type CreateAddressDto = z.infer<typeof CreateAddressSchema>;