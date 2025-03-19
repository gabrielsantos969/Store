import { z } from "zod";

export const AddCartItemSchema = z.object({
    cartId: z.string(),
    quantity: z.number().min(1),
    productId: z.string(),
    total: z.number()
});

export type AddCartItemDto = z.infer<typeof AddCartItemSchema>;