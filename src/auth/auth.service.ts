import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthRepository } from './auth.repository.interface';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserClientDto } from './dto/register-user-client.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserAdminDto } from './dto/register-user-admin.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('IAuthRepository')
        private repository: IAuthRepository,
        private jwtService: JwtService
    ){}

    async registerClient(data: RegisterUserClientDto): Promise<any>{
        const { phone, ...dataClient} = data;

        const userExists = await this.repository.findByEmail(dataClient.email);

        if(userExists != null){
            throw new ConflictException(`The e-mail informed is already registered.`);
        }

        const hashedPassword = await bcrypt.hash(dataClient.password, 10);
        const user = await this.repository.create({
            ...dataClient,
            password: hashedPassword,
            role: 'CLIENT',
            Customer: {
                create: {
                    phone: phone
                }
            }
        });

        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = await this.jwtService.signAsync(payload);

        return { access_token: accessToken };
    }

    async registerAdmin(data: RegisterUserAdminDto): Promise<any>{

        const userExists = await this.repository.findByEmail(data.email);

        if(userExists != null){
            throw new ConflictException(`The e-mail informed is already registered.`);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.repository.create({
            ...data,
            password: hashedPassword,
            role: 'ADMIN'
        });

        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = await this.jwtService.signAsync(payload);

        return { access_token: accessToken };
    }

    async login(loginUserDto: LoginUserDto): Promise<any>{
        const user = await this.repository.findByEmail(loginUserDto.email);

        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(
            loginUserDto.password,
            user.password,
        );

        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = await this.jwtService.signAsync(payload);

        return { access_token: accessToken };        
    }
}
