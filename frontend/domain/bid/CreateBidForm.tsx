'use client'

import { AuctionDto } from '@/types/api/Api'
import { FormEvent, useState } from 'react'
import { useAuth } from '../auth/AuthContext'

interface CreateBidFormProps {
  auction: AuctionDto
}

export const CreateBidForm = ({ auction }: CreateBidFormProps) => {
  const [bids, setBids] = useState([])
  const [bidAmount, setBidAmount] = useState('')
  const [error, setError] = useState('')
  const { user } = useAuth()

  const handleBidSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!user) {
      setError('You must be logged in to place a bid.')
      return
    }

    try {
      // await axios.post(`/api/auctions/${id}/bid`, {
      //   amount: bidAmount,
      // }, {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // });

      setBidAmount('')
      // const response = await axios.get(`/api/auctions/${id}/bids`);
      // setBids(response.data);
    } catch (err) {
      setError('Failed to place a bid. Please try again.')
    }
  }

  return (
    <div className='container mx-auto p-4'>
      {auction ? (
        <>
          <h1 className='text-3xl font-bold mb-4'>{auction.title}</h1>
          <p className='mb-4'>{auction.description}</p>
          <p className='mb-4'>Current Price: ${auction.currentPrice}</p>
          <p className='mb-4'>
            Ends at: {new Date(auction.endTime).toLocaleString()}
          </p>

          <h2 className='text-2xl font-bold mb-2'>Place a Bid</h2>
          <form onSubmit={handleBidSubmit} className='mb-4'>
            <input
              type='number'
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className='border p-2 rounded mb-2 w-full'
              placeholder='Enter your bid amount'
            />
            <button
              type='submit'
              className='bg-blue-500 text-white py-2 px-4 rounded'
            >
              Place Bid
            </button>
          </form>
          {error && <p className='text-red-500'>{error}</p>}

          <h2 className='text-2xl font-bold mb-2'>Bids</h2>
          {/* <ul>
            {bids.map((bid) => (
              <li key={bid.id} className="mb-2">
                ${bid.amount} by User {bid.userId} at {new Date(bid.createdAt).toLocaleString()}
              </li>
            ))}
          </ul> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
