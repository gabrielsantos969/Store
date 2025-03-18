import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { CategoryController } from './category.controller';

@Module({
    imports: [PrismaModule],
    providers: [
        CategoryService,
        {
            provide: 'ICategoryRepository',
            useClass: CategoryRepository
        }
    ],
    controllers: [CategoryController],
    exports: [CategoryService]
})
export class CategoryModule {}
