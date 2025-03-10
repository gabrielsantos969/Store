import { Injectable } from "@nestjs/common";
import { IAuthRepository } from "./auth.repository.interface";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthRepository implements IAuthRepository{
    constructor(private prisma: PrismaService){}

    create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({data});
    }

    findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: {email}})
    }

}