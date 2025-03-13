import { Category, Prisma } from "@prisma/client";

export interface ICategoryRepository {
    findAll(): Promise<Category[]>;
    findById(id: number): Promise<Category | null>;
    create(data: Prisma.CategoryCreateInput): Promise<Category>;
    update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category>;
    remove(id: number): Promise<Category>;
}