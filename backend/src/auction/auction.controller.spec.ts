import { Test, TestingModule } from '@nestjs/testing';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

describe('AuctionController', () => {
  let controller: AuctionController;
  let service: AuctionService;

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
      controllers: [AuctionController],
      providers: [
        AuctionService,
        PrismaService,
        AuthService,
        {
          provide: JwtAuthGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    }).compile();

    controller = module.get<AuctionController>(AuctionController);
    service = module.get<AuctionService>(AuctionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createAuction', () => {
    it('should create an auction', async () => {
      const auctionDto = {
        title: 'Test Auction',
        description: 'Test Description',
        startingPrice: 100,
      };
      const userId = 1;
      const auction = {
        id: 1,
        ...auctionDto,
        currentPrice: 100,
        endTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId,
      };

      jest
        .spyOn(service, 'createAuction')
        .mockImplementation(async () => auction);

      expect(await controller.createAuction(auction)).toBe(auction);
    });
  });

  describe('getAuctions', () => {
    it('should return a list of auctions', async () => {
      const auctions = [
        {
          id: 1,
          title: 'Auction 1',
          description: 'Description 1',
          startingPrice: 100,
          currentPrice: 100,
          endTime: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'Auction 2',
          description: 'Description 2',
          startingPrice: 200,
          currentPrice: 200,
          endTime: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest
        .spyOn(service, 'getAuctions')
        .mockImplementation(async () => auctions);

      expect(await controller.getAuctions()).toBe(auctions);
    });
  });

  describe('getAuction', () => {
    it('should return a specific auction', async () => {
      const auctionId = 1;
      const auction = {
        id: 1,
        title: 'Auction 1',
        description: 'Description 1',
        startingPrice: 100,
        currentPrice: 100,
        endTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'getAuction').mockImplementation(async () => auction);

      expect(await controller.getAuction(auctionId)).toBe(auction);
    });
  });

  describe('updateAuction', () => {
    it('should update an auction', async () => {
      const auctionId = 1;
      const updateDto = {
        title: 'Updated Auction',
        description: 'Updated Description',
        startingPrice: 150,
      };
      const auction = {
        id: 1,
        ...updateDto,
        currentPrice: 150,
        endTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(service, 'updateAuction')
        .mockImplementation(async () => auction);

      expect(await controller.updateAuction(auctionId, updateDto)).toBe(
        auction,
      );
    });
  });

  describe('deleteAuction', () => {
    it('should delete an auction', async () => {
      const auctionId = 1;

      jest
        .spyOn(service, 'deleteAuction')
        .mockImplementation(async () => ({ deleted: true }));

      expect(await controller.deleteAuction(auctionId)).toEqual({
        deleted: true,
      });
    });
  });
});
