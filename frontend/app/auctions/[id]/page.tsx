import { getAuction } from '@/api/getAuction'
import { getBidsByAuction } from '@/api/getBidsByAuction'
import { AuctionCard } from '@/domain/auction/AuctionCard'
import { CreateBidForm } from '@/domain/bid/CreateBidForm'
import ProtectedRoute from '@/domain/ProtectedRoute'
import { revalidatePath } from 'next/cache'

export default async function Auction(data: { params: { id: string } }) {
  const { id } = data.params
  const auction = await getAuction(Number(id))
  const bids = await getBidsByAuction(auction.id)

  console.log(auction, bids.length)

  if (!auction) {
    throw new Error('Auction not found')
  }

  return (
    <ProtectedRoute>
      <section className='flex min-h-screen flex-col items-center p-10 gap-8'>
        <h1 className='text-black font-bold text-4xl'> Create a bid!</h1>
        <div className='flex gap-4 w-full'>
          <CreateBidForm auction={auction} bids={bids} />
        </div>
      </section>
    </ProtectedRoute>
  )
}
