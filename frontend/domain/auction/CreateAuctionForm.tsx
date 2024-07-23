'use client'

import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import toast from 'react-hot-toast'
import { useMutationCreateAuction } from '@/api/api-hooks/useMutationCreateAuction'
import { useRouter } from 'next/navigation'

interface CreateAuctionFormProps {}

export const CreateAuctionForm = ({}: CreateAuctionFormProps) => {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startingPrice, setStartingPrice] = useState('')
  const [endTime, setEndTime] = useState('')
  const router = useRouter()

  const { mutateAsync: createAuction } = useMutationCreateAuction()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert('You need to be logged in to create an auction.')
      return
    }

    try {
      const createdJson = await createAuction({
        title,
        description,
        startingPrice: Number(startingPrice),
        endTime,
      })
      const auction = await createdJson.json()
      router.push(`/auctions/${auction.id}`)
    } catch (error) {
      console.error('Failed to create auction:', error)
      toast.error('Failed to create auction.')
    }
  }

  return (
    <div className='container mx-auto p-4'>
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
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Starting Price
          </label>
          <input
            type='number'
            value={startingPrice}
            onChange={(e) => setStartingPrice(e.target.value)}
            className='p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            required
            min={0}
          />
        </div>
        {/* If we want to add strict end time but not really part of this basic functionality */}
        {/* <div>
          <label className='block text-sm font-medium text-gray-700'>
            End Time (optional)
          </label>
          <input
            type='datetime-local'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          />
        </div> */}
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
        >
          Create Auction
        </button>
      </form>
    </div>
  )
}
