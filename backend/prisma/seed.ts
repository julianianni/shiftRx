import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password', 10);

  // Create users
  await prisma.user.createMany({
    data: [
      {
        email: 'user1@example.com',
        password: hashedPassword,
      },
      {
        email: 'user2@example.com',
        password: hashedPassword,
      },
      {
        email: 'user3@example.com',
        password: hashedPassword,
      },
      {
        email: 'user4@example.com',
        password: hashedPassword,
      },
    ],
    skipDuplicates: true, // Skip if the email already exists
  });

  const allUsers = await prisma.user.findMany();

  // Create auctions
  await prisma.auction.createMany({
    data: [
      {
        title: 'Antique Vase',
        description: 'A beautiful antique vase from the 19th century.',
        startingPrice: 100,
        currentPrice: 100,
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
        userId: allUsers[0].id,
      },
      {
        title: 'Vintage Watch',
        description: 'A classic vintage watch from the 70s.',
        startingPrice: 200,
        currentPrice: 200,
        endTime: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
        userId: allUsers[1].id,
      },
      {
        title: 'Old Painting',
        description: 'A masterpiece from a famous artist.',
        startingPrice: 500,
        currentPrice: 500,
        endTime: new Date(Date.now() + 72 * 60 * 60 * 1000), // 3 days from now
        userId: allUsers[2].id,
      },
      {
        title: 'Rare Book',
        description: 'A rare book from the 18th century.',
        startingPrice: 150,
        currentPrice: 150,
        endTime: new Date(Date.now() + 96 * 60 * 60 * 1000), // 4 days from now
        userId: allUsers[3].id,
      },
    ],
  });

  const allAuctions = await prisma.auction.findMany();

  // Create bids
  await prisma.bid.createMany({
    data: [
      { auctionId: allAuctions[0].id, userId: allUsers[1].id, amount: 150 },
      { auctionId: allAuctions[0].id, userId: allUsers[2].id, amount: 200 },
      { auctionId: allAuctions[1].id, userId: allUsers[3].id, amount: 250 },
      { auctionId: allAuctions[1].id, userId: allUsers[0].id, amount: 300 },
      { auctionId: allAuctions[2].id, userId: allUsers[1].id, amount: 600 },
      { auctionId: allAuctions[2].id, userId: allUsers[3].id, amount: 700 },
      { auctionId: allAuctions[3].id, userId: allUsers[0].id, amount: 180 },
      { auctionId: allAuctions[3].id, userId: allUsers[2].id, amount: 200 },
    ],
  });

  console.log('Database seeded with users, auctions, and bids!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
