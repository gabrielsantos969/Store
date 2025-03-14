import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { RolesGuard } from './roles.guard';

@Module({
  imports:[
    PrismaModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    AuthRepository,
    JwtStrategy,
    RolesGuard,
    { 
      provide: 'IAuthRepository',
      useClass: AuthRepository
    }
  ],
  controllers: [AuthController]
})
export class AuthModule {}
