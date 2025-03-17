import { Stock } from "@prisma/client";

export interface IStockRepository {
    addProductStock(productId: string, quantity: number): Promise<Stock>;
    removeProductStock(productId: string, quantity: number): Promise<Stock>;
}