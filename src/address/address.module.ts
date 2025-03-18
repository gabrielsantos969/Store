import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AddressRepository } from './address.repository';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
    imports: [PrismaModule, CustomerModule],
    providers: [
        AddressService,
        AddressRepository,
        {
            provide: 'IAddressRepository',
            useClass: AddressRepository
        }
    ],
    controllers: [AddressController]
})
export class AddressModule {}
