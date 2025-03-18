import { Prisma, Address, Customer } from "@prisma/client";
import { IAddressRepository } from "./address.repository.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AddressRepository implements IAddressRepository {
    constructor(private readonly prisma: PrismaService){}

    async create(data: Prisma.AddressCreateInput): Promise<Address> {
        return await this.prisma.address.create({ data });
    }

    async findAllByCustomerId(customerId: string): Promise<Address[]> {
        return await this.prisma.address.findMany({
            where: {
                customerId
            }
        });
    }

    async findById(customerId: string, id: string): Promise<Address | null> {
        return await this.prisma.address.findFirst({
            where: {
                customerId,
                id
            }
        });
    }

    async update(customerId: string, id: string, data: Prisma.AddressUpdateInput): Promise<Address> {
        return await this.prisma.address.update({
            where: {
                customerId,
                id
            },
            data
        });
    }

    async remove(customerId: string, id: string): Promise<Address> {
        return await this.prisma.address.delete({ where: { customerId, id }});
    }

    async findByIdCustomer(userId: string): Promise<Customer | null> {
        const customer = await this.prisma.customer.findUnique({
            where: { userId }
        });
        
        return customer; 
    }

}