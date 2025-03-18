import { Injectable } from "@nestjs/common";
import { ICustomerRepository } from "./customer.repository.interface";
import { Prisma, Customer } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CustomerRepository implements ICustomerRepository{
    constructor(private readonly prisma: PrismaService){}

    async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
        return await this.prisma.customer.create({ data });
    }

    async findById(id: string): Promise<Customer | null> {
        return await this.prisma.customer.findUnique({ where: { id } });
    }

    async findByUserId(userId: string): Promise<Customer | null> {
        return await this.prisma.customer.findUnique({ where: { userId } });
    }

    async update(userId: string, data: Prisma.CustomerUpdateInput): Promise<Customer> {
        return await this.prisma.customer.update({
            where: {
                userId
            },
            data
        });
    }

    async remove(userId: string): Promise<Customer> {
        return await this.prisma.customer.delete({ where: { userId } });
    }

}