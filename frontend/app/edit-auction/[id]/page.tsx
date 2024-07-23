import { getAuction } from '@/api/getAuction'
import { CreateAuctionForm } from '@/domain/auction/CreateAuctionForm'
import { EditAuctionForm } from '@/domain/auction/EditAuctionForm'
import ProtectedRoute from '@/domain/ProtectedRoute'

export default async function EditAuction(data: { params: { id: string } }) {
  const auctionId = data.params.id
  const auction = await getAuction(Number(auctionId))
  return (
    <ProtectedRoute>
      <section className='flex min-h-screen flex-col items-center p-10 gap-8'>
        <h1 className='text-bold text-4xl text-black'>Edit your action</h1>
        <EditAuctionForm auction={auction} />
      </section>
    </ProtectedRoute>
  )
}
