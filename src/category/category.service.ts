import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICategoryRepository } from './category.repository.interface';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @Inject('ICategoryRepository')
        private readonly repository: ICategoryRepository
    ){}

    async findAll(): Promise<Category[]>{
        return await this.repository.findAll();
    }

    async findById(id: number): Promise<Category | null> {
        const category = await this.repository.findById(id);

        if(!category){
            throw new NotFoundException(`Category with ID: ${id} not found`);
        }
        
        return category;
    }

    async create(data: CreateCategoryDto): Promise<Category> {
        return await this.repository.create(data);
    }

    async update(id: number, data: UpdateCategoryDto): Promise<Category> {
        await this.findById(id);
        return await this.repository.update(id, data);
    }

    async remove(id: number): Promise<Category> {
        await this.findById(id);
        return await this.repository.remove(id);
    }
}
