import { Prisma, Product } from "@prisma/client";

export interface IProductRepository{
    create(data: Prisma.ProductCreateInput): Promise<Product>;
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    update(id: string, data: Prisma.ProductUpdateInput): Promise<Product>;
    remove(id: string): Promise<Product>;
}