import { Injectable } from "@nestjs/common";
import { ICategoryRepository } from "./category.repository.interface";
import { Category, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CategoryRepository implements ICategoryRepository {
    constructor(private readonly prisma: PrismaService){}

    async findAll(): Promise<Category[]> {
        return this.prisma.category.findMany();
    }

    async findById(id: number): Promise<Category | null> {
        return this.prisma.category.findUnique({
            where: { id }
        });
    }

    async create(data: Prisma.CategoryCreateInput): Promise<Category> {
        return this.prisma.category.create({ data });
    }

    async update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category> {
        return this.prisma.category.update({
            where: { id },
            data
        });
    }

    async remove(id: number): Promise<Category> {
        return this.prisma.category.delete({
            where: { id }
        });
    }

}