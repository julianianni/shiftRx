import { AuctionDto } from '@/types/api/Api'
import { formatDateToDDMMYYYYY } from '@/utils/date.utils'
import Image from 'next/image'
import Link from 'next/link'

interface AuctionCardProps {
  auction: AuctionDto
  view?: 'grid' | 'individual'
}

export const AuctionCard = ({ auction, view = 'grid' }: AuctionCardProps) => {
  return (
    <div className='min-w-12 min-h-6 rounded-lg bg-blue-400 text-blue p-4 font-extralight'>
      <div className='flex flex-col gap-2'>
        {' '}
        <Image
          // random number between 220 and 190 to generate diff images on picsum
          src={`https://picsum.photos/${Math.floor(Math.random() * (220 - 190 + 1) + 190)}/200`}
          alt='img_auction'
          width={200}
          height={200}
          className='h-[200px] w-full'
        />
        <div>
          <p>
            <span className='font-bold'> title:</span> {auction.title}
          </p>
          <p>
            <span className='font-bold'> description:</span>{' '}
            {auction.currentPrice}
          </p>
          <p>
            <span className='font-bold'> currentPrice:</span> $
            {auction.currentPrice}
          </p>
          <p>
            <span className='font-bold'> Ends on:</span>{' '}
            {formatDateToDDMMYYYYY(auction.endTime)}
          </p>
        </div>
        {view === 'grid' && (
          <Link
            href={`/auctions/${auction.id}`}
            className='bg-blue-500 text-white rounded-lg p-2 mt-2'
          >
            See more details
          </Link>
        )}
      </div>
    </div>
  )
}