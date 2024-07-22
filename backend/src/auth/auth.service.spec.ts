import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should hash the password and create a user', async () => {
      const createUserDto = { email: 'test@example.com', password: 'password' };
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      jest.spyOn(prisma.user, 'create').mockResolvedValue({
        id: 1,
        email: createUserDto.email,
        password: hashedPassword,
      } as any);

      const user = await service.signUp(
        createUserDto.email,
        createUserDto.password,
      );

      expect(user).toHaveProperty('id');
      expect(user.email).toBe(createUserDto.email);
    });
  });

  // Add more tests for other methods
});
