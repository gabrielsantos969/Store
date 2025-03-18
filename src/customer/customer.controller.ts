import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CustomerService } from './customer.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Customer } from '@prisma/client';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateCustomerDto, CreateCustomerSchema } from './dto/create-customer.dto';
import { UpdateCustomerDto, UpdateCustomerSchema } from './dto/update-customer.dto';

@Controller('customer')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CustomerController {
    constructor(private readonly service: CustomerService){}

    @Get()
    @Roles('ADMIN', 'CLIENT')
    async findByUserId(@Req() req): Promise<Customer | null>{
        const userId = req.user.userId;
        return await this.service.findByUserId(userId);
    }

    @Get(':id')
    @Roles('ADMIN', 'CLIENT')
    async findById(@Param('id') id: string, @Req() req): Promise<Customer | null>{
        const userId = req.user.userId;
        return await this.service.findById(id, userId);
    }

    @Post()
    @Roles('ADMIN', 'CLIENT')
    async create(@Body(new ZodValidationPipe(CreateCustomerSchema)) data: CreateCustomerDto, @Req() req): Promise<Customer>{
        const userId = req.user.userId;
        return await this.service.create(userId, data);
    }

    @Put()
    @Roles('ADMIN', 'CLIENT')
    async update(@Body(new ZodValidationPipe(UpdateCustomerSchema)) data: UpdateCustomerDto, @Req() req): Promise<Customer>{
        const userId = req.user.userId;
        return await this.service.update(userId, data);
    }

    @Delete()
    @Roles('ADMIN', 'CLIENT')
    async remove(@Req() req): Promise<Customer>{
        const userId = req.user.userId;
        return await this.service.remove(userId);
    }
}
