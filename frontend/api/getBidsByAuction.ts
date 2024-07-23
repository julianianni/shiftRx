import { getApiInstance } from '@/infrastructure/apiInstace'
import { AuctionDto, BidDto } from '@/types/api/Api'

export const getBidsByAuction = async (
  auctionId: number
): Promise<BidDto[]> => {
  const { api } = getApiInstance()
  const bidsJson = await api.bidControllerGetBids(Number(auctionId), {
    cache: 'no-store',
  })

  const bids = await bidsJson.json()

  return bids
}
