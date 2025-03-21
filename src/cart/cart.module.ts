import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';
import { ProductModule } from 'src/product/product.module';
import { CustomerModule } from 'src/customer/customer.module';
import { CartController } from './cart.controller';

@Module({
    imports: [PrismaModule, ProductModule, CustomerModule],
    providers:[
        {
            provide: 'ICartRepository',
            useClass: CartRepository
        },
        CartService
    ],
    controllers: [CartController]
})
export class CartModule {}
