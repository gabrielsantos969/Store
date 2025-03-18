import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IAddressRepository } from './address.repository.interface';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address, Customer } from '@prisma/client';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class AddressService {
    constructor(
        @Inject('IAddressRepository')
        private readonly repository: IAddressRepository,
        private readonly customer: CustomerService
    ){}

    async create(userId: string, data: CreateAddressDto): Promise<Address> {
        try {
            const customer = await this.customer.findByUserId(userId);
    
            return await this.repository.create({
                ...data,
                Customer: {
                    connect: {
                        id: customer.id
                    }
                }
            } )
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }

            throw new InternalServerErrorException(`${error.message}`);
        }
    }
    
    async findAllByCustomerId(userId:string): Promise<Address[]> {
        try {
            const customer = await this.customer.findByUserId(userId);
            return await this.repository.findAllByCustomerId(customer.id);
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }
            
            throw new InternalServerErrorException(`${error.message}`);
        }
    }

    async findById(userId:string, id: string): Promise<Address> {
        try {
            const customer = await this.customer.findByUserId(userId);
            const address = await this.repository.findById(customer.id , id);
    
            if(!address){
                throw new NotFoundException(`Address not exist.`);
            }
    
            return address;
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }
            
            throw new InternalServerErrorException(`${error.message}`);
        }
    }

    async update(userId:string, id: string, data: UpdateAddressDto): Promise<Address> {
        try {
            const address = await this.findById(userId, id);
            return await this.repository.update(address.customerId, id, data);
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }
            
            throw new InternalServerErrorException(`${error.message}`);
        }
    }

    async remove(userId:string, id: string): Promise<Address> {
        try {
            const address = await this.findById(userId, id);
            return await this.repository.remove(address.customerId, id);
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }
            
            throw new InternalServerErrorException(`${error.message}`);
        }
    }
    
}
