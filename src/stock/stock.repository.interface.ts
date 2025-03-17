import { Stock } from "@prisma/client";

export interface IStockRepository {
    findByProductId(productId: string):Promise<Stock | null>;
    addProductStock(productId: string, quantity: number): Promise<Stock>;
    removeProductStock(productId: string, quantity: number): Promise<Stock>;
}