import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthRepository } from './auth.repository.interface';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('IAuthRepository')
        private repository: IAuthRepository,
        private jwtService: JwtService
    ){}

    async register(data: RegisterUserDto): Promise<any>{
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.repository.create({
            ...data,
            password: hashedPassword,
        });

        const payload = { sub: user.id, email: user.email, isAdmin: user.isAdmin };
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
        const payload = { sub: user.id, email: user.email, isAdmin: user.isAdmin };
        const accessToken = await this.jwtService.signAsync(payload);

        return { access_token: accessToken };        
    }
}
