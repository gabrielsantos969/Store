import { z } from "zod";

export const CreateCategorySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    imageUrl: z.string().optional()
});

export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;