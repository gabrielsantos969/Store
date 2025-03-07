 import { z } from 'zod';

export const CreateProductSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    price: z.number().min(0.01),
    imageUrl: z.string().url().optional(),
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;