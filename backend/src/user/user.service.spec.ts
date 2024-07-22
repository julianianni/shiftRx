import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
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

    service = module.get<UserService>(UserService);
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

      const user = await service.createUser(createUserDto);

      expect(user).toHaveProperty('id');
      expect(user.email).toBe(createUserDto.email);
    });
  });

  // Add more tests for other methods
});
