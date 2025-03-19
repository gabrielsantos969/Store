import { Cart, CartItem, Prisma } from "@prisma/client";
import { AddCartItemDto } from "./dto/add-cart-item.dto";

export interface ICartRepository {
    findCartByUserId(userId: string): Promise<Cart>;
    createOrUpdateCart(userId: string): Promise<Cart>;
    findCartItem(cartId: string, productId: string): Promise<CartItem>;
    addOrUpdateCartItem(data: AddCartItemDto): Promise<CartItem>
    removeCartItem(cartId: string, productId: string): Promise<any>;
    clearCart(userId: string): Promise<Cart> 
}