import { z } from "zod";

export const IncDecProductStockSchema = z.object({
    productId: z.string(),
    quantity: z.number()
})

export type IncDecProductStockDto = z.infer<typeof IncDecProductStockSchema>;