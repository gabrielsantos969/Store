import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes } from '@nestjs/common';
import { ProductService } from './product.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateProductDto, CreateProductSchema } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { UpdateProductDto, UpdateProductSchema } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly service: ProductService){}

    @Post()
    @UsePipes(new ZodValidationPipe(CreateProductSchema))
    async create(@Body() data: CreateProductDto): Promise<Product>{
        return await this.service.create(data);
    }

    @Get()
    async findAll(): Promise<Product[]>{
        return this.service.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<Product | null>{
        return this.service.findById(id);
    }

    @Put(':id')
    @UsePipes(new ZodValidationPipe(UpdateProductSchema))
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateProductDto,
    ): Promise<Product>{
        return this.service.update(id, data);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number):Promise<Product>{
        return this.service.remove(id);
    }
}
