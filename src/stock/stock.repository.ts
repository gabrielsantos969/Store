import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient, Stock } from "@prisma/client";
import { IStockRepository } from "./stock.repository.interface";
import { Decimal } from "@prisma/client/runtime/library";

@Injectable()
export class StockRepository implements IStockRepository{
    constructor(private readonly prisma: PrismaClient){}

    async findByProductId(productId: string): Promise<Stock | null> {
        return await this.prisma.stock.findUnique({
            where: { productId }
        })
    }

    async addProductStock(productId: string, quantity: number): Promise<Stock> {        
        return await this.prisma.stock.update({
            where: {productId},
            data: { quantity: { increment: new Decimal(quantity) }}
        });
    }
    
    async removeProductStock(productId: string, quantity: number): Promise<Stock> {
        return await this.prisma.stock.update({
            where: { productId },
            data: { quantity: { decrement: new Decimal(quantity) }}
        });
    }

    
}