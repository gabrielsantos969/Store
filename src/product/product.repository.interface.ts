import { Prisma, Product } from "@prisma/client";

export interface ProductRepositoryInterface{
    create(data: Prisma.ProductCreateInput): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product | null>;
    update(id: number, data: Prisma.ProductUpdateInput): Promise<Product>;
    remove(id: number): Promise<Product>;
}