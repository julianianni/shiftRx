import { useMutation } from '@tanstack/react-query'

import { UserLoginDto } from '@/types/api/Api'
import { getApiInstance } from '@/infrastructure/apiInstace'

export const useMutationLoginUser = (
  loginFn: (email: string, password: string) => Promise<void>
) => {
  return useMutation({
    mutationFn: async (userLoginDto: UserLoginDto) => {
      return loginFn(userLoginDto.email, userLoginDto.password)
    },
  })
}
