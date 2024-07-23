import { useMutation } from '@tanstack/react-query'

import { getApiInstance, getAuthHeader } from '@/infrastructure/apiInstace'

export const useMutationPlaceBid = () => {
  return useMutation({
    mutationFn: async ({ amount, id }: { amount: number; id: number }) => {
      const { api } = getApiInstance()
      return api.bidControllerPlaceBid(id, { amount }, getAuthHeader())
    },
  })
}
