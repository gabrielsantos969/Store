import { Injectable } from "@nestjs/common";
import { ICartRepository } from "./cart.repository.interface";
import { CartItem, Cart } from "@prisma/client";
import { AddCartItemDto } from "./dto/add-cart-item.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CartRepository implements ICartRepository{
    constructor(private readonly prisma: PrismaService){}

    async findCartByCustomerId(customerId: string): Promise<Cart | null> {
        return await this.prisma.cart.findUnique({
            where: { customerId },
            include: { items: { include: { Product: true }}}
        });
    }

    async createOrUpdateCart(customerId: string): Promise<Cart> {
        return await this.prisma.cart.upsert({
            where: { customerId },
            update: {},
            create: { customerId }
        })
    }

    async findCartItem(cartId: string, productId: string): Promise<CartItem | null> {
        return await this.prisma.cartItem.findFirst({
            where: { cartId, productId  },

        })
    }

    async addOrUpdateCartItem(data: AddCartItemDto): Promise<CartItem> {
        return await this.prisma.cartItem.upsert({
            where: {
                cartId_productId: { cartId: data.cartId, productId: data.productId }
            },
            update: {
                quantity: { increment: data.quantity },
                total: { increment: data.total }
            },
            create: {
                cartId: data.cartId,
                productId: data.productId,
                quantity: data.quantity,
                total: data.total
            }
        })
    }

    async removeCartItem(cartId: string, productId: string): Promise<any> {
        return this.prisma.cartItem.deleteMany({
            where: { cartId, productId },
          });
    }

    async clearCart(customerId: string): Promise<Cart> {
        return this.prisma.cart.delete({
            where: { customerId },
        });
    }

}