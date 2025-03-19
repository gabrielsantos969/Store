import { Cart, CartItem, Prisma } from "@prisma/client";
import { AddCartItemDto } from "./dto/add-cart-item.dto";

export interface ICartRepository {
    findCartByUserId(customerId: string): Promise<Cart | null>;
    createOrUpdateCart(customerId: string): Promise<Cart>;
    findCartItem(cartId: string, productId: string): Promise<CartItem | null>;
    addOrUpdateCartItem(data: AddCartItemDto): Promise<CartItem>
    removeCartItem(cartId: string, productId: string): Promise<any>;
    clearCart(customerId: string): Promise<Cart> 
}