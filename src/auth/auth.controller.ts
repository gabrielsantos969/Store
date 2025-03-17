import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { RegisterUserClientDto, RegisterUserClientSchema } from './dto/register-user-client.dto';
import { AuthService } from './auth.service';
import { LoginUserDto, LoginUserSchema } from './dto/login-user.dto';
import { RegisterUserAdminDto, RegisterUserAdminSchema } from './dto/register-user-admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService){}

    @Post('register')
    @UsePipes(new ZodValidationPipe(RegisterUserClientSchema))
    async registerClient(@Body() data: RegisterUserClientDto): Promise<any>{
        return this.service.registerClient(data);
    }

    @Post('admin/register')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    async registerAdmin(@Body(new ZodValidationPipe(RegisterUserAdminSchema)) data: RegisterUserAdminDto): Promise<any>{
        return this.service.registerAdmin(data);
    }

    @Post('login')
    async login(@Body(new ZodValidationPipe(LoginUserSchema)) data: LoginUserDto): Promise<any>{
        return this.service.login(data);
    }
}
