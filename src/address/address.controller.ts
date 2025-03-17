import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Address } from '@prisma/client';

@Controller('address')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AddressController {
    constructor(private readonly service: AddressService){}

    @Get()
    @Roles('ADMIN', 'CLIENT')
    async findAllByCustomerId(@Req() req): Promise<Address[]>{
        const userId = req.user.userId;
        console.log(req.user.userId)
        return await this.service.findAllByCustomerId(userId);
    }
}
