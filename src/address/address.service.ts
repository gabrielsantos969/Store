import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAddressRepository } from './address.repository.interface';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from '@prisma/client';

@Injectable()
export class AddressService {
    constructor(
        @Inject('IAddressRepository')
        private readonly repository: IAddressRepository
    ){}

    async create(data: CreateAddressDto): Promise<Address> {
        return await this.repository.create({
            ...data,
            Customer: {
                connect: {
                    id: data.customerId
                }
            }
        } )
    }
    
    async findAllByCustomerId(customerId: string): Promise<Address[]> {
        return await this.repository.findAllByCustomerId(customerId);
    }

    async findById(customerId: string, id: string): Promise<Address | null> {
        const address = await this.repository.findById(customerId, id);

        if(!address){
            throw new NotFoundException(`Address not exist.`);
        }

        return address;
    }

    async update(customerId: string, id: string, data: UpdateAddressDto): Promise<Address> {
        await this.findById(customerId, id);
        return await this.repository.update(customerId, id, data);
    }

    async remove(customerId: string, id: string): Promise<Address> {
        await this.findById(customerId, id);
        return await this.repository.remove(customerId, id);
    }
    
}
