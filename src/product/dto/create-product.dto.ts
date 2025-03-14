import { z } from 'zod';
import { UnitProduct } from './enum/unit-product.enum';

export const CreateProductSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    price: z.number().min(0.01),
    imageUrl: z.string().optional(),
    categoryId: z.number().int().positive(),
    stock: z.object({
        quantity: z.number(),
        unit: z.nativeEnum(UnitProduct),
        unitQuantity: z.number().optional()
    })
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;