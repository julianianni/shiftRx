import { useMutation } from '@tanstack/react-query'

import { getApiInstance, getAuthHeader } from '@/infrastructure/apiInstace'
import { CreateAuctionDto } from '@/types/api/Api'

export const useMutationCreateAuction = () => {
  return useMutation({
    mutationFn: async (data: CreateAuctionDto) => {
      const { api } = getApiInstance()
      return api.auctionControllerCreateAuction(data, getAuthHeader())
    },
  })
}
