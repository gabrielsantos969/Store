import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CartRepository } from './cart.repository';

@Module({
    imports: [PrismaModule],
    providers:[
        {
            provide: 'ICartRepository',
            useClass: CartRepository
        }
    ]
})
export class CartModule {}
