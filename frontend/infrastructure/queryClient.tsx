'use client'

import toast from 'react-hot-toast'
import { Mutation, MutationCache, Query, QueryCache, QueryClient } from '@tanstack/react-query'

function capitalizeFirstLetter(str: string): string {
  return str[0].toUpperCase() + str.slice(1)
}

const defaultErrorHandler = (e: unknown, ctx: Query | Mutation) => {
  const meta = ctx?.meta ?? {}
  if ('preventGlobalError' in meta) {
    return
  }

  let errorMessage: string | [string] = 'Something went wrong...'
  if (typeof e === 'object') {
    errorMessage =
      (e as unknown as { error: { message: string | [string] } })?.error?.message ??
      'Something went wrong'
  }

  if (Array.isArray(errorMessage)) {
    errorMessage?.forEach((msg) => {
      toast.error(capitalizeFirstLetter(msg))
    })
  } else {
    toast.error(capitalizeFirstLetter(errorMessage))
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  mutationCache: new MutationCache({
    onError: (e, _, __, mutation) => {
      defaultErrorHandler(e, mutation as Mutation)
    },
  }),
  queryCache: new QueryCache({
    onError: (e, q) => {
      defaultErrorHandler(e, q as Query)
    },
  }),
})
