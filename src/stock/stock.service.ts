import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IStockRepository } from './stock.repository.interface';
import { Stock } from '@prisma/client';

@Injectable()
export class StockService {
    constructor(
        @Inject('IStockRepository')
        private readonly repository: IStockRepository
    ){}

    async findByProductId(productId: string): Promise<Stock | null> {
        const stock = this.repository.findByProductId(productId);

        if(!stock){
            throw new NotFoundException(`Stock not found for the product.`);
        }

        return stock;
    }

    async addProductStock(productId: string, quantity: number): Promise<Stock> {
        await this.findByProductId(productId);
        return await this.repository.addProductStock(productId, quantity);
    }

    async removeProductStock(productId: string, quantity: number): Promise<Stock> {
        const stock = await this.repository.findByProductId(productId);

        if(stock!.quantity.toNumber() < quantity){
            throw new Error(`Insufficient quantity in stock.`);
        }

        return this.repository.removeProductStock(productId, quantity);

    }
   
}
