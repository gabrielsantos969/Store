import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Cart, CartItem } from '@prisma/client';

@Controller('cart')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CartController {
    constructor(private readonly service: CartService){}

    @Post('add-item')
    async addItem(@Body()data: {productId: string, quantity: number}, @Req() req): Promise<CartItem>{
        const userId = req.user.userId;
        return await this.service.addItem(userId, data.productId, data.quantity);
    }

    @Get()
    async getCart(@Req() req): Promise<Cart>{
        const userId = req.user.userId;
        return await this.service.getCart(userId);
    }

    @Delete('remove-item/:id')
    async remoteItem(@Param('id') productId: string,@Req() req): Promise<any>{
        const userId = req.user.userId;
        return this.service.removeItem(userId, productId);
    }
}
