import { useMutation } from '@tanstack/react-query'

import { getApiInstance, getAuthHeader } from '@/infrastructure/apiInstace'
import { UpdateAuctionDto } from '@/types/api/Api'

export const useMutationEditAuction = (auctionId: number) => {
  return useMutation({
    mutationFn: async (data: UpdateAuctionDto) => {
      const { api } = getApiInstance()
      return api.auctionControllerUpdateAuction(
        auctionId,
        data,
        getAuthHeader()
      )
    },
  })
}
