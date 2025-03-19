import { z } from 'zod';
import { FormatProduct } from './enum/format-product.enum';

export const UpdateProductSchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().optional(),
    price: z.number().min(0.01).optional(),
    imageUrl: z.string().optional(),
    weight: z.number().optional(),
    height: z.number().min(2).optional(),
    width: z.number().min(11).optional(),
    length: z.number().min(16).optional(),
    diameter: z.number().optional(),
    format: z.nativeEnum(FormatProduct).optional(),
    categoryId: z.number().int().positive().optional()
});

export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;