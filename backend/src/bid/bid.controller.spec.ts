import { createE2ETestEnvironment, E2ETestEnvironment } from '../e2e.helper';
import { BidController } from './bid.controller';
import { BidService } from './bid.service';

describe('BidController', () => {
  let controller: BidController;
  let service: BidService;
  let testEnv: E2ETestEnvironment;

  beforeEach(async () => {
    testEnv = await createE2ETestEnvironment();

    controller = testEnv.module.get<BidController>(BidController);
    service = testEnv.module.get<BidService>(BidService);
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
});
