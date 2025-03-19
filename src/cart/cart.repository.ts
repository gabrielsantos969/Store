import { Injectable } from "@nestjs/common";
import { ICartRepository } from "./cart.repository.interface";
import { CartItem, Cart } from "@prisma/client";
import { AddCartItemDto } from "./dto/add-cart-item.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CartRepository implements ICartRepository{
    constructor(private readonly prisma: PrismaService){}

    async findCartByUserId(userId: string): Promise<Cart> {
        throw new Error("Method not implemented.");
    }

    async createOrUpdateCart(userId: string): Promise<Cart> {
        throw new Error("Method not implemented.");
    }

    async findCartItem(cartId: string, productId: string): Promise<CartItem> {
        throw new Error("Method not implemented.");
    }

    async addOrUpdateCartItem(data: AddCartItemDto): Promise<CartItem> {
        throw new Error("Method not implemented.");
    }

    async removeCartItem(cartId: string, productId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async clearCart(userId: string): Promise<Cart> {
        throw new Error("Method not implemented.");
    }

}