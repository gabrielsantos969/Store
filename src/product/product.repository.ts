import { Injectable } from "@nestjs/common";
import { Prisma, Product } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductRepositoryInterface } from "./product.repository.interface";

@Injectable()
export class ProductRepository implements ProductRepositoryInterface{
    constructor(private readonly prisma: PrismaService){}

    async create(data: Prisma.ProductCreateInput): Promise<Product>{
        return this.prisma.product.create({ data });
    }

    async findAll(): Promise<Product[]>{
        return this.prisma.product.findMany();
    }

    async findById(id: string): Promise<Product | null>{
        return this.prisma.product.findUnique({ 
            where: { id }
        });
    }

    async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product>{
        return this.prisma.product.update({
            where: { id }, 
            data
        });
    }

    async remove(id: string): Promise<Product>{
        return this.prisma.product.delete({
            where: { id }
        })
    }
}