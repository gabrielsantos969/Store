import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { ProductRepositoryInterface } from './product.repository.interface';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    {
      provide: 'ProductRepositoryInterface',
      useClass: ProductRepository
    }
  ]
})
export class ProductModule {}
