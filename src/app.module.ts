import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { CategoryModule } from './category/category.module';
import { StockModule } from './stock/stock.module';
import { AddressModule } from './address/address.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [ProductModule, PrismaModule, AuthModule, CategoryModule, StockModule, AddressModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
