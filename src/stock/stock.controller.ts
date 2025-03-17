import { Body, Controller, Post } from '@nestjs/common';
import { StockService } from './stock.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { IncDecProductStockDto, IncDecProductStockSchema } from './dto/add-stock.dto';
import { Stock } from '@prisma/client';

@Controller('stock')
export class StockController {
    constructor(private readonly service: StockService){}

    @Post('add')
    async addProductStock(@Body(new ZodValidationPipe(IncDecProductStockSchema)) data: IncDecProductStockDto): Promise<Stock>{
        return this.service.addProductStock(data.productId, data.quantity);
    }

}
