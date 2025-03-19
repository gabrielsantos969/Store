import { z } from 'zod';
import { UnitProduct } from './enum/unit-product.enum';
import { FormatProduct } from './enum/format-product.enum';

export const CreateProductSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    price: z.number().min(0.01),
    imageUrl: z.string().optional(),
    weight: z.number(),
    height: z.number().min(2),
    width: z.number().min(11),
    length: z.number().min(16),
    diameter: z.number().optional(),
    format: z.nativeEnum(FormatProduct),
    categoryId: z.number().int().positive(),
    stock: z.object({
        quantity: z.number(),
        unit: z.nativeEnum(UnitProduct),
        unitQuantity: z.number().optional()
    })
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;