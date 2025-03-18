import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ICustomerRepository } from './customer.repository.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from '@prisma/client';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @Inject('ICustomerRepository')
        private readonly repository: ICustomerRepository
    ){}

    async create(userId: string, data: CreateCustomerDto): Promise<Customer>{

        try {
            await this.findByUserId(userId);

            return await this.repository.create({
                ...data,
                User: {
                    connect: {
                        id: userId
                    }
                }
            });
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }

            throw new InternalServerErrorException(`${error.message}`);
        }
    }

    async findById(id: string, userId: string): Promise<Customer>{
        try {
            await this.findByUserId(userId);

            const customer = await this.repository.findById(id);

            if(!customer){
                throw new NotFoundException(`Customer not found.`);
            }

            return customer; 
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }

            throw new InternalServerErrorException(`${error.message}`);
        }
    }

    async findByUserId(userId: string): Promise<Customer | null>{
        try {
            const customer = await this.repository.findByUserId(userId);

            if(!customer){
                throw new NotFoundException(`Customer not found.`);
            }

            return customer; 
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }

            throw new InternalServerErrorException(`${error.message}`);
        }
    }

    async update(userId: string, data: UpdateCustomerDto): Promise<Customer>{
        try {
            await this.findByUserId(userId);
            return await this.repository.update(userId, data);
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }

            throw new InternalServerErrorException(`${error.message}`);
        }
    }

    async remove(userId: string): Promise<Customer>{
        try {
            await this.findByUserId(userId);
            return await this.repository.remove(userId);
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }

            throw new InternalServerErrorException(`${error.message}`);
        }
    }
}
