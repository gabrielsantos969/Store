import { Address, Prisma } from "@prisma/client";

export interface IAddressRepository {
    create(data: Prisma.AddressCreateInput): Promise<Address>;
    findAllByCustomerId(customerId: string): Promise<Address[]>;
    findById(customerId: string, id: string): Promise<Address | null>;
    update(customerId: string, id: string): Promise<Address | null>;
    remove(customerId: string, id: string): Promise<Address | null>;
}