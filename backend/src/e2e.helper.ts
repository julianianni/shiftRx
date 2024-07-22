import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

export async function createE2ETestEnvironment() {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' }, // Set the expiration time as per your requirements
      }),
    ],
    controllers: [UserController],
    providers: [
      {
        provide: UserService,
        useValue: {
          createUser: jest.fn(),
          login: jest.fn(),
          getProfile: jest.fn(),
          updateUser: jest.fn(),
          deleteUser: jest.fn(),
        },
      },
    ],
  }).compile();

  const app = module.createNestApplication();
  await app.init();

  return {
    app,
    module,
    async createUser() {
      const userService = module.get<UserService>(UserService);
      const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };
      return userService.createUser(user);
    },
  };
}

type UnwrapPromise<P> = P extends Promise<infer R> ? R : never;
export type E2ETestEnvironment = UnwrapPromise<
  ReturnType<typeof createE2ETestEnvironment>
>;
