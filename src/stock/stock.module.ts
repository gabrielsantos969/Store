import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StockRepository } from './stock.repository';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';

@Module({
    imports: [
        PrismaModule
    ],
    providers: [
        StockService,
        StockRepository,
        {
            provide: 'IStockRepository',
            useClass: StockRepository
        }
    ],
    controllers: [StockController]
})
export class StockModule {}
