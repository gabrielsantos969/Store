import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [PrismaModule, CategoryModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    {
      provide: 'IProductRepository',
      useClass: ProductRepository
    }
  ]
})
export class ProductModule {}
