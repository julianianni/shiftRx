'use client'

import { AuctionDto, BidDto } from '@/types/api/Api'
import { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { socket } from '../../infrastructure/socket'
import Image from 'next/image'
import toast from 'react-hot-toast'

import { useMutationPlaceBid } from '@/api/api-hooks/useMutationPlaceBid'
import clearCachesByServerAction from '@/infrastructure/revalidatePath'
import { useResettableState } from '../useResetTableState'
import Link from 'next/link'

interface CreateBidFormProps {
  auction: AuctionDto
  bids: BidDto[]
}

export const CreateBidForm = ({
  auction,
  bids: externalBids,
}: CreateBidFormProps) => {
  const [bids, setBids] = useResettableState<BidDto[]>(externalBids || [])

  const [bidAmount, setBidAmount] = useState('')
  const [error, setError] = useState('')
  const { user } = useAuth()
  const { mutateAsync } = useMutationPlaceBid()
  const isOwner = user.id === auction.userId

  useEffect(() => {
    socket.emit('joinAuction', auction.id)

    socket.on('newBid', (bid) => {
      setBids((prevBids) => [...prevBids, bid])
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [auction.id, setBids])

  const handleBidSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!user) {
      setError('You must be logged in to place a bid.')
      return
    }

    try {
      mutateAsync({ amount: Number(bidAmount), id: auction.id })

      setBidAmount('')
      toast.success('You have place a new bid!')
    } catch (err) {
      setError('Failed to place a bid. Please try again.')
    } finally {
      clearCachesByServerAction('/auctions/[id]')
    }
  }

  return (
    <div className='container mx-auto p-4'>
      {auction ? (
        <>
          <div className='flex gap-10'>
            <Image
              src={`https://picsum.photos/300/300`}
              alt='img_auction'
              width={200}
              height={200}
              className='h-[200px] w-[200px] rounded-lg'
            />

            <div className='flex flex-col gap-2'>
              <div className='flex gap-2'>
                {' '}
                <h1 className='text-3xl font-bold mb-4'>
                  Title: {auction.title}
                </h1>
                {isOwner && (
                  <Link
                    href={`/edit-auction/${auction.id}`}
                    className='bg-blue-400 rounded-lg flex items-center jusfify-center px-2 py-1 text-white'
                  >
                    Edit your auction
                  </Link>
                )}
              </div>
              <p className='mb-4'>Description: {auction.description}</p>
              <p className='mb-4'>Current Price: ${auction.currentPrice}</p>
              <p className='mb-4'>
                Ends at: {new Date(auction.endTime).toLocaleString()}
              </p>
            </div>
          </div>

          <h2 className='text-2xl font-bold mb-2 mt-4'>Place a Bid</h2>
          <form onSubmit={handleBidSubmit} className='mb-4'>
            <input
              type='number'
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className='border p-2 rounded mb-2 w-full text-black'
              placeholder='Enter your bid amount'
              min={auction.currentPrice + 1}
              disabled={isOwner}
            />
            <div className='flex gap-4 items-center'>
              <button
                type='submit'
                className='bg-blue-500 text-white py-2 px-4 rounded'
                disabled={isOwner}
              >
                Place Bid
              </button>
              {isOwner && (
                <p className='text-red-500'>
                  You are the owner of this auction and can not make bids
                </p>
              )}
            </div>
          </form>
          {error && <p className='text-red-500'>{error}</p>}

          <h2 className='text-2xl font-bold mb-2'>Previous Bids</h2>
          <ul>
            {!!bids.length ? (
              bids.map((bid) => (
                <li key={bid.id} className='mb-2'>
                  {bid.user.email === user.email
                    ? 'You '
                    : `User: ${bid.user.email}`}{' '}
                  made a bid of ${bid.amount} on{' '}
                  {new Date(bid.createdAt).toLocaleString()}
                </li>
              ))
            ) : (
              <p>No bids yet</p>
            )}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
