import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Address } from '@prisma/client';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateAddressDto, CreateAddressSchema } from './dto/create-address.dto';

@Controller('address')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AddressController {
    constructor(private readonly service: AddressService){}

    @Get()
    @Roles('ADMIN', 'CLIENT')
    async findAllByCustomerId(@Req() req): Promise<Address[]>{
        const userId = req.user.userId;
        return await this.service.findAllByCustomerId(userId);
    }

    @Post()
    @Roles('ADMIN', 'CLIENT')
    async create(@Body(new ZodValidationPipe(CreateAddressSchema))data: CreateAddressDto, @Req() req): Promise<Address>{
        const userId = req.user.userId;
        return await this.service.create(userId, data);
    }
}
