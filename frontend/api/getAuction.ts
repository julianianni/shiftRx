import { getApiInstance } from '@/infrastructure/apiInstace'
import { AuctionDto } from '@/types/api/Api'

export const getAuction = async (id: number): Promise<AuctionDto> => {
  const { api } = getApiInstance()
  const auctionJson = await api.auctionControllerGetAuction(String(id), {
    cache: 'no-store',
  })

  const auction = await auctionJson.json()

  return auction
}
