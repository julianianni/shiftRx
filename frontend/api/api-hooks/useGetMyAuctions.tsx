import { getApiInstance, getAuthHeader } from '@/infrastructure/apiInstace'
import { useQuery } from '@tanstack/react-query'

export const useGetMyAuctions = () => {
  return useQuery({
    queryKey: ['myAuctions'],
    queryFn: async () => {
      const { api } = getApiInstance()
      const { data } = await api.auctionControllerGetMyAuctionsWithBids({
        cache: 'no-store',
        ...getAuthHeader(),
      })
      return data
    },
  })
}
