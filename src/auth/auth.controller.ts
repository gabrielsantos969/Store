import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { RegisterUserDto, RegisterUserSchema } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto, LoginUserSchema } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService){}

    @Post('register')
    @UsePipes(new ZodValidationPipe(RegisterUserSchema))
    async register(@Body() data: RegisterUserDto): Promise<any>{
        return this.service.register(data);
    }

    @Post('login')
    @UsePipes(new ZodValidationPipe(LoginUserSchema))
    async login(@Body() data: LoginUserDto): Promise<any>{
        return this.service.login(data);
    }
}
