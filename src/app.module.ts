import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ProductModule, PrismaModule, AuthModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
