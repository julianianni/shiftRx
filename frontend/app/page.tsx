import { getAuctions } from '@/api/getAuctions'
import { AuctionCard } from '@/domain/auction/AuctionCard'

export default async function Home() {
  const auctions = await getAuctions()

  return (
    <main className='flex min-h-screen flex-col items-center p-10 gap-8'>
      <div>Active auctions</div>
      <div className='grid gap-4 grid-cols-4'>
        {auctions.map((auction) => (
          <AuctionCard auction={auction} key={auction.id} />
        ))}
      </div>
    </main>
  )
}
