import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StockRepository } from './stock.repository';
import { StockService } from './stock.service';

@Module({
    imports: [
        PrismaModule
    ],
    providers: [
        {
            provide: 'IStockRepository',
            useClass: StockRepository
        },
        StockService
    ]
})
export class StockModule {}
