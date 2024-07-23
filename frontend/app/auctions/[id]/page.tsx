import { getAuction } from '@/api/getAuction'
import { AuctionCard } from '@/domain/auction/AuctionCard'
import { CreateBidForm } from '@/domain/bid/CreateBidForm'
import ProtectedRoute from '@/domain/ProtectedRoute'

export default async function Auction(data: { params: { id: string } }) {
  const { id } = data.params
  const auction = await getAuction(Number(id))

  if (!auction) {
    throw new Error('Auction not found')
  }

  return (
    <ProtectedRoute>
      <section className='flex min-h-screen flex-col items-center p-10 gap-8'>
        <div> Create a bid!</div>
        <div className='flex gap-4 w-full'>
          <AuctionCard auction={auction} view='individual' />
          <CreateBidForm auction={auction} />
        </div>
      </section>
    </ProtectedRoute>
  )
}
