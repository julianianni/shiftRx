'use client'

import { getApiInstance } from '@/infrastructure/apiInstace'
import { UserDto } from '@/types/api/Api'
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react'

interface AuthContextType {
  user: any
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { api } = getApiInstance()

  const [user, setUser] = useState<UserDto | null>(null)

  useEffect(() => {
    // Fetch user from local storage or API
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await api.authControllerGetProfile({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          setUser(response.data)
        } catch (error) {
          console.error(error)
          localStorage.removeItem('token')
        }
      }
    }

    fetchUser()
  }, [api])

  const login = async (email: string, password: string) => {
    const response = await api.authControllerSignIn({ email, password })

    localStorage.setItem('token', response.data.accessToken)
    setUser(response.data.user)
  }

  const register = async (email: string, password: string) => {
    await api.authControllerSignUp({
      email,
      password,
    })
    await login(email, password)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
