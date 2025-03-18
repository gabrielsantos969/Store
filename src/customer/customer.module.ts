import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CustomerRepository } from './customer.repository';

@Module({
  imports:[PrismaModule],
  providers: [
    CustomerService,
    {
      provide: "ICustomerRepository",
      useClass: CustomerRepository
    }
  ]
})
export class CustomerModule {}
