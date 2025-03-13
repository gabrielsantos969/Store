import { z } from "zod";

export const UpdateCategorySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().optional()
});

export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;