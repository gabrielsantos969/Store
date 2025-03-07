import { Injectable } from "@nestjs/common";
import { Prisma, Product } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductRepository{
    constructor(private readonly prisma: PrismaService){}

    async create(data: Prisma.ProductCreateInput): Promise<Product>{
        return this.prisma.product.create({ data });
    }

    async findAll(): Promise<Product[]>{
        return this.prisma.product.findMany();
    }

    async findOne(id: number): Promise<Product | null>{
        return this.prisma.product.findUnique({ 
            where: { id }
        });
    }

    async update(id: number, data: Prisma.ProductUpdateInput): Promise<Product>{
        return this.prisma.product.update({
            where: { id }, 
            data
        });
    }

    async remove(id: number): Promise<Product>{
        return this.prisma.product.delete({
            where: { id }
        })
    }
}