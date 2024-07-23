'use client'

import { useState } from 'react'
import { useAuth } from '@/domain/auth/AuthContext'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(email, password)
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-96'>
        <h1 className='text-2xl text-black  font-bold mb-4'>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4 text-black'>
            <label className='block mb-2 text-black'>Email</label>
            <input
              type='email'
              className='w-full p-2 border border-gray-300 rounded text-black '
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='text-black block mb-2 '>Password</label>
            <input
              type='password'
              className='w-full p-2 border border-gray-300 rounded text-black'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type='submit'
            className='w-full p-2 bg-blue-500 text-white rounded'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
