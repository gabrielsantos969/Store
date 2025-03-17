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
    
    async findAllByCustomerId(userId:string): Promise<Address[]> {
        console.log("PASSEI SERVI 1");
        
        const customer = await this.findByIdCustomer(userId);

        console.log("PASSEI SERVI 2");

        return await this.repository.findAllByCustomerId(customer!.id);
    }

    async findById(userId:string, id: string): Promise<Address | null> {
        const customer = await this.findByIdCustomer(userId);

        const address = await this.repository.findById(customer!.id , id);

        if(!address){
            throw new NotFoundException(`Address not exist.`);
        }

        return address;
    }

    async update(userId:string, id: string, data: UpdateAddressDto): Promise<Address> {
        const customer = await this.findByIdCustomer(userId);
        await this.findById(customer!.id , id);
        return await this.repository.update(customer!.id, id, data);
    }

    async remove(userId:string, id: string): Promise<Address> {
        const customer = await this.findByIdCustomer(userId);
        await this.findById(customer!.id, id);
        return await this.repository.remove(customer!.id, id);
    }

    async findByIdCustomer(userId: string): Promise<Customer | null> {
        console.log("PASSEI SERV 3")
        const customer = await this.repository.findByIdCustomer(userId);
        console.log("PASSEI SERVI 4");
        console.log(customer);

        if(!customer){
            throw new NotFoundException(`Curstomer not found.`);
        }

        return customer;
    }
    
}
