import { getApiInstance } from '@/infrastructure/apiInstace'
import { AuctionDto } from '@/types/api/Api'

export const getAuctions = async (): Promise<AuctionDto[]> => {
  const { api } = getApiInstance()
  const auctionsJson = await api.auctionControllerGetAuctions()

  const auctions = await auctionsJson.json()

  return auctions
}
