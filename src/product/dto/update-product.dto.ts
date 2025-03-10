import { z } from 'zod';

export const UpdateProductSchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().optional(),
    price: z.number().min(0.01).optional(),
    imageUrl: z.string().optional(),
});

export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;