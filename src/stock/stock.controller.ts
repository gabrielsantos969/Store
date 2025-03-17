import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { StockService } from './stock.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { IncDecProductStockDto, IncDecProductStockSchema } from './dto/inc-dec-stock.dto';
import { Stock } from '@prisma/client';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('stock')
export class StockController {
    constructor(private readonly service: StockService){}

    @Post('add')
    @UseGuards(AdminGuard)
    async addProductStock(@Body(new ZodValidationPipe(IncDecProductStockSchema)) data: IncDecProductStockDto): Promise<Stock>{
        return this.service.addProductStock(data.productId, data.quantity);
    }

    @Post('dec')
    @UseGuards(AdminGuard)
    async removeProductStock(@Body(new ZodValidationPipe(IncDecProductStockSchema)) data: IncDecProductStockDto): Promise<Stock>{
        return this.service.removeProductStock(data.productId, data.quantity);
    }

}
