import { Cart, CartItem, Prisma } from "@prisma/client";
import { AddCartItemDto } from "./dto/add-cart-item.dto";

export interface ICartRepository {
    addItem(userId: string, data: AddCartItemDto): Promise<CartItem>;
    removeItem(userId: string, productId: string): Promise<any>;
    getCart(userId: string): Promise<Cart>;
    clearCart(userId: string): Promise<Cart> 
}