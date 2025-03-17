import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient, Stock } from "@prisma/client";
import { IStockRepository } from "./stock.repository.interface";
import { Decimal } from "@prisma/client/runtime/library";

@Injectable()
export class StockRepository implements IStockRepository{
    constructor(private readonly prisma: PrismaClient){}

    async addProductStock(productId: string, quantity: number): Promise<Stock> {
        const stock = await this.prisma.stock.findUnique({
            where: { productId }
        });

        if(!stock){
            throw new NotFoundException(`Stock not found for the product.`);
        }
        
        return await this.prisma.stock.update({
            where: {productId},
            data: { quantity: { increment: new Decimal(quantity) }}
        });
    }
    async removeProductStock(productId: string, quantity: number): Promise<Stock> {
        const stock = await this.prisma.stock.findUnique({
            where: { productId }
        });

        if(!stock){
            throw new NotFoundException(`Stock not found for the product.`);
        }

        if(stock.quantity.toNumber() < quantity){
            throw new Error(`Insufficient quantity in stock.`);
        }

        return await this.prisma.stock.update({
            where: { productId },
            data: { quantity: { decrement: new Decimal(quantity) }}
        });
    }

    
}