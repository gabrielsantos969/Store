import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { RegisterUserClientDto, RegisterUserClientSchema } from './dto/register-user-client.dto';
import { AuthService } from './auth.service';
import { LoginUserDto, LoginUserSchema } from './dto/login-user.dto';
import { AdminGuard } from './guards/admin.guard';
import { RegisterUserAdminDto, RegisterUserAdminSchema } from './dto/register-user-admin.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService){}

    @Post('register')
    @UsePipes(new ZodValidationPipe(RegisterUserClientSchema))
    async registerClient(@Body() data: RegisterUserClientDto): Promise<any>{
        return this.service.registerClient(data);
    }

    @Post('admin/register')
    @UseGuards(AdminGuard)
    @UsePipes(new ZodValidationPipe(RegisterUserAdminSchema))
    async registerAdmin(@Body() data: RegisterUserAdminDto): Promise<any>{
        return this.service.registerAdmin(data);
    }

    @Post('login')
    @UsePipes(new ZodValidationPipe(LoginUserSchema))
    async login(@Body() data: LoginUserDto): Promise<any>{
        return this.service.login(data);
    }
}
