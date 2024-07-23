'use client'

import { useGetMyAuctions } from '@/api/api-hooks/useGetMyAuctions'
import Link from 'next/link'

export const DashboardListPage = () => {
  const { isError, isLoading, data } = useGetMyAuctions()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Oops! there was an error getting your acutions...</p>

  const auctions = data?.auctions || []
  const bids = data?.bids || []

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Dashboard</h1>
      <h2 className='text-2xl font-semibold mb-2'>Your Auctions</h2>

      <ul className='list-disc ml-5'>
        {!!auctions.length ? (
          auctions.map((auction) => (
            <li key={auction.id} className='mb-2'>
              <Link
                href={`/auctions/${auction.id}`}
                className='text-blue-500 underline'
              >
                Title: {auction.title}
              </Link>
              <div>
                <h2 className='text-black font-semibold'>Bids </h2>
                {auction.bids.length ? (
                  auction.bids?.map((bid) => {
                    return (
                      <div key={bid.id} className='flex gap-2'>
                        <p>Amount:${bid.amount}</p>
                        <p>by user {bid.user.email}</p>
                      </div>
                    )
                  })
                ) : (
                  <p className='italic'>No bids on this auction</p>
                )}
              </div>
            </li>
          ))
        ) : (
          <p>No auctions</p>
        )}
      </ul>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>Your Bids</h2>
      {!!bids.length ? (
        <ul className='list-disc ml-5'>
          {bids.map((bid) => (
            <li key={bid.id} className='mb-2 flex'>
              Bid of ${bid.amount} on auction:{'  '}
              <Link
                href={`/auctions/${bid.auctionId}`}
                className='text-blue-500 underline'
              >
                {' '}
                {bid.auctionTitle}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bids found.</p>
      )}
    </div>
  )
}
