import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }, // Set the expiration time as per your requirements
    }),
    UserModule,
  ], // Use forwardRef if there are circular dependencies
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
