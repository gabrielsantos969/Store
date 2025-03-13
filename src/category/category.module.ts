import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';

@Module({
    imports: [PrismaModule],
    providers: [
        CategoryService,
        {
            provide: 'ICategoryRepository',
            useClass: CategoryRepository
        }
    ]
})
export class CategoryModule {}
