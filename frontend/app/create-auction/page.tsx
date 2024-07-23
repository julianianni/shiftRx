import { CreateAuctionForm } from '@/domain/auction/CreateAuctionForm'
import ProtectedRoute from '@/domain/ProtectedRoute'

export default async function CreateAuction() {
  return (
    <ProtectedRoute>
      <section className='flex min-h-screen flex-col items-center p-10 gap-8'>
        <h1 className='text-bold text-4xl text-black'>Create new auction</h1>
        <CreateAuctionForm />
      </section>
    </ProtectedRoute>
  )
}
