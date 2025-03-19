import { z } from "zod";

export const AddCartItemSchema = z.object({
    quantity: z.number().min(1),
    productId: z.string()
});

export type AddCartItemDto = z.infer<typeof AddCartItemSchema>;