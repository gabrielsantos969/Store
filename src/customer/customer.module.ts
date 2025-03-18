import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CustomerRepository } from './customer.repository';
import { CustomerController } from './customer.controller';

@Module({
  imports:[PrismaModule],
  providers: [
    CustomerService,
    {
      provide: "ICustomerRepository",
      useClass: CustomerRepository
    }
  ],
  controllers: [CustomerController],
  exports: [CustomerService]
})
export class CustomerModule {}
