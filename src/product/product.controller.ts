import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ProductService } from './product.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateProductDto, CreateProductSchema } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { UpdateProductDto, UpdateProductSchema } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('product')
export class ProductController {
    constructor(private readonly service: ProductService){}

    @Post()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    async create(@Body(new ZodValidationPipe(CreateProductSchema)) data: CreateProductDto): Promise<Product>{
        return await this.service.create(data);
    }

    @Get()
    async findAll(): Promise<Product[]>{
        return this.service.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Product | null>{
        return this.service.findById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    async update(
        @Param('id') id: string,
        @Body(new ZodValidationPipe(UpdateProductSchema)) data: UpdateProductDto,
    ): Promise<Product>{ 
        return this.service.update(id, data);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    async remove(@Param('id') id: string):Promise<Product>{
        return this.service.remove(id);
    }
}
