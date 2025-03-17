import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { StockService } from './stock.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { IncDecProductStockDto, IncDecProductStockSchema } from './dto/inc-dec-stock.dto';
import { Stock } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('stock')
export class StockController {
    constructor(private readonly service: StockService){}

    @Post('add')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    async addProductStock(@Body(new ZodValidationPipe(IncDecProductStockSchema)) data: IncDecProductStockDto): Promise<Stock>{
        return this.service.addProductStock(data.productId, data.quantity);
    }

    @Post('dec')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    async removeProductStock(@Body(new ZodValidationPipe(IncDecProductStockSchema)) data: IncDecProductStockDto): Promise<Stock>{
        return this.service.removeProductStock(data.productId, data.quantity);
    }

}
