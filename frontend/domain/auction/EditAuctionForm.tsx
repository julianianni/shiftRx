'use client'

import { AuctionDto } from '@/types/api/Api'
import { useAuth } from '../auth/AuthContext'
import { useState } from 'react'
import { useMutationEditAuction } from '@/api/api-hooks/useMutationEditAuction'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import clearCachesByServerAction from '@/infrastructure/revalidatePath'

interface EditAuctionFormProps {
  auction: AuctionDto
}

export const EditAuctionForm = ({ auction }: EditAuctionFormProps) => {
  const router = useRouter()
  const { user } = useAuth()
  const [title, setTitle] = useState(auction.title)
  const [description, setDescription] = useState(auction.description)

  // const [endTime, setEndTime] = useState('')
  const { mutateAsync: editAuction, isSuccess } = useMutationEditAuction(
    auction.id
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert('You need to be logged in to edit an auction.')
      return
    }

    try {
      await editAuction({ title, description })
      toast.success('Auction updated successfully!')
    } catch (error) {
      console.error('Failed to update auction:', error)
      toast.error('Failed to update auction.')
    }
  }

  if (isSuccess) {
    clearCachesByServerAction('auctions/[id]')
    router.push(`/auctions/${auction.id}`)
  }
  if (!auction) return <p>Loading...</p>

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Edit Auction</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Title
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            required
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            required
          />
        </div>

        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
        >
          Update Auction
        </button>
      </form>
    </div>
  )
}
