import { Test, TestingModule } from '@nestjs/testing';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { BidController } from './bid/bid.controller';
import { BidService } from './bid/bid.service';
import { BidGateway } from './bid/bid.gateway';
import { PrismaService } from './prisma/prisma.service';

export async function createE2ETestEnvironment() {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' }, // Set the expiration time as per your requirements
      }),
    ],
    controllers: [AuthController, BidController],
    providers: [
      {
        provide: AuthService,
        useValue: {
          createUser: jest.fn(),
          login: jest.fn(),
          getProfile: jest.fn(),
          updateUser: jest.fn(),
          deleteUser: jest.fn(),
        },
      },
      PrismaService,
      AuthService,
      BidService,
      BidGateway,
    ],
  }).compile();

  const app = module.createNestApplication();
  await app.init();

  return {
    app,
    module,
    async createUser() {
      const authService = module.get<AuthService>(AuthService);
      const user = {
        email: 'john.doe@example.com',
        password: 'password123',
      };
      return authService.signUp(user.email, user.password);
    },
  };
}

type UnwrapPromise<P> = P extends Promise<infer R> ? R : never;
export type E2ETestEnvironment = UnwrapPromise<
  ReturnType<typeof createE2ETestEnvironment>
>;
