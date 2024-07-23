'use client'

import { useEffect } from 'react'
import { useAuth } from './auth/AuthContext'
import { useRouter } from 'next/navigation'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
