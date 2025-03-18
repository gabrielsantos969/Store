import { Customer, Prisma } from "@prisma/client";

export interface  ICustomerRepository{
    create(data: Prisma.CustomerCreateInput): Promise<Customer>;
    findById(id: string): Promise<Customer | null>;
    findByUserId(userId: string): Promise<Customer | null>;
    update(userId: string, data: Prisma.CustomerUpdateInput): Promise<Customer>;
    remove(userId: string): Promise<Customer>;
}