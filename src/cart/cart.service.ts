import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ICartRepository } from './cart.repository.interface';
import { Cart, CartItem } from '@prisma/client';
import { ProductService } from 'src/product/product.service';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class CartService {
    constructor(
        @Inject('ICartRepository')
        private readonly repository: ICartRepository,
        private readonly product: ProductService,
        private readonly customer: CustomerService
    ){}

    async addItem(userId: string, productId: string, quantity: number): Promise<CartItem>{
        try {
            const productExists = await this.product.findById(productId);
            const customerExists = await this.customer.findByUserId(userId);
    
            const cart = await this.repository.createOrUpdateCart(customerExists.id);
            const total = quantity * productExists!.price.toNumber();
    
            return this.repository.addOrUpdateCartItem({
                cartId: cart.id,
                productId: productExists!.id,
                quantity,
                total
            });
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }

            throw new InternalServerErrorException(`${error.message}`);
        }
    }

    async findCartItem(cartId: string, productId: string): Promise<CartItem>{
        try {
            const cartItemExist = await this.repository.findCartItem(cartId, productId);
            if(!cartItemExist) throw new NotFoundException(`Product not found in Cart`);
            return cartItemExist;
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }

            throw new InternalServerErrorException(`${error.message}`);
        }
    }

    async removeItem(userId: string, productId: string): Promise<any>{
        try {
            const cart = await this.getCart(userId);
            await this.findCartItem(cart.id, productId);

            await this.repository.removeCartItem(cart!.id, productId);
            return { message: 'Item successfully removed' };
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }

            throw new InternalServerErrorException(`${error.message}`);
        }

    }

    async getCart(userId: string): Promise<Cart>{
        try {
            const customerExists = await this.customer.findByUserId(userId);
            const cart = await this.repository.findCartByCustomerId(customerExists.id);
            if(!cart) throw new NotFoundException(`Cart not found.`);
            return cart;
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }

            throw new InternalServerErrorException(`${error.message}`);
        }
    }

    async clearCart(userId: string): Promise<Cart>{
        try {
            const customerExists = await this.customer.findByUserId(userId);
            await this.repository.clearCart(customerExists.id);
            return await this.getCart(userId);
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }

            throw new InternalServerErrorException(`${error.message}`);
        }
    }
}
