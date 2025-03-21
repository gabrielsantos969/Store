import { Injectable, NotFoundException } from "@nestjs/common";
import { Stock } from "@prisma/client";
import { IStockRepository } from "./stock.repository.interface";
import { Decimal } from "@prisma/client/runtime/library";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StockRepository implements IStockRepository{
    constructor(private readonly prisma: PrismaService){}

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