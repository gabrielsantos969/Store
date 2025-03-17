import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateCategoryDto, CreateCategorySchema } from './dto/create-category.dto';
import { UpdateCategoryDto, UpdateCategorySchema } from './dto/update-category.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('category')
export class CategoryController {
    constructor(private readonly service: CategoryService){}

    @Get()
    async findAll(): Promise<Category[]>{
        return await this.service.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<Category | null>{
        return await this.service.findById(id);
    }

    @Post()
    @UseGuards(AdminGuard)
    async create(@Body(new ZodValidationPipe(CreateCategorySchema)) data: CreateCategoryDto): Promise<Category>{
        return await this.service.create(data);
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    async update(
        @Param('id', ParseIntPipe) id: number, 
        @Body(new ZodValidationPipe(UpdateCategorySchema))data: UpdateCategoryDto
    ): Promise<Category>{
        return await this.service.update(id, data);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Category>{
        return this.service.remove(id);
    }
}
