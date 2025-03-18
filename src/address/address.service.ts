import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAddressRepository } from './address.repository.interface';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address, Customer } from '@prisma/client';

@Injectable()
export class AddressService {
    constructor(
        @Inject('IAddressRepository')
        private readonly repository: IAddressRepository
    ){}

    async create(userId: string, data: CreateAddressDto): Promise<Address> {
        const customer = await this.findByIdCustomer(userId);

        return await this.repository.create({
            ...data,
            Customer: {
                connect: {
                    id: customer.id
                }
            }
        } )
    }
    
    async findAllByCustomerId(userId:string): Promise<Address[]> {
        const customer = await this.findByIdCustomer(userId);

        return await this.repository.findAllByCustomerId(customer.id);
    }

    async findById(userId:string, id: string): Promise<Address> {
        const customer = await this.findByIdCustomer(userId);

        const address = await this.repository.findById(customer.id , id);

        if(!address){
            throw new NotFoundException(`Address not exist.`);
        }

        return address;
    }

    async update(userId:string, id: string, data: UpdateAddressDto): Promise<Address> {
        const address = await this.findById(userId, id);
        return await this.repository.update(address.customerId, id, data);
    }

    async remove(userId:string, id: string): Promise<Address> {
        const address = await this.findById(userId, id);
        return await this.repository.remove(address.customerId, id);
    }

    async findByIdCustomer(userId: string): Promise<Customer> {
        const customer = await this.repository.findByIdCustomer(userId);

        if(!customer){
            throw new NotFoundException(`Curstomer not found.`);
        }

        return customer;
    }
    
}
