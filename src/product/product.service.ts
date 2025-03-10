import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepositoryInterface } from './product.repository.interface';

@Injectable()
export class ProductService {

    constructor(
        @Inject('ProductRepositoryInterface')
        private readonly repository: ProductRepositoryInterface
    ){}

    async create(createProductDto: CreateProductDto): Promise<Product>{
        return await this.repository.create(createProductDto);
    }

    async findAll(): Promise<Product[]> {
        return await this.repository.findAll();
      }
    
      async findOne(id: number): Promise<Product | null> {
        return await this.repository.findOne(id);
      }
    
      async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        return await this.repository.update(id, updateProductDto);
      }
    
      async remove(id: number): Promise<Product> {
        return await this.repository.remove(id);
      }
}
