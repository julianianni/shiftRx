import { Test, TestingModule } from '@nestjs/testing';
import { BidController } from './bid.controller';
import { BidService } from './bid.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

describe('BidController', () => {
  let controller: BidController;
  let service: BidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        }),
        ConfigModule.forRoot(),
      ],
      controllers: [BidController],
      providers: [
        BidService,
        PrismaService,
        AuthService,
        UserService,
        {
          provide: JwtAuthGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    }).compile();

    controller = module.get<BidController>(BidController);
    service = module.get<BidService>(BidService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('placeBid', () => {
    it('should place a bid', async () => {
      const auctionId = 1;
      const userId = 1;
      const amount = 100;
      const bid = { id: 1, auctionId, userId, amount, createdAt: new Date() };

      jest.spyOn(service, 'placeBid').mockImplementation(async () => bid);

      expect(
        await controller.placeBid(auctionId, { amount }, { user: { userId } }),
      ).toBe(bid);
    });
  });

  describe('getBids', () => {
    it('should return a list of bids', async () => {
      const auctionId = 1;
      const bids = [
        { id: 1, auctionId, userId: 1, amount: 100, createdAt: new Date() },
        { id: 2, auctionId, userId: 2, amount: 200, createdAt: new Date() },
      ];

      jest.spyOn(service, 'getBids').mockImplementation(async () => bids);

      expect(await controller.getBids(auctionId)).toBe(bids);
    });
  });
});
