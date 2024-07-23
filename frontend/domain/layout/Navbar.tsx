'use client'

import Link from 'next/link'
import { useAuth } from '../auth/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className='bg-blue-500 p-4'>
      <div className='container mx-auto flex justify-between items-center gap-4'>
        <Link href='/' className='text-white text-xl font-bold'>
          Auction App
        </Link>
        <div className='flex gap-2 items-center'>
          {user ? (
            <>
              <span className='text-white mr-4'>Hello, {user.email}</span>
              <Link
                href='/create-auction'
                className='text-white py-2 px-4 rounded mr-2'
              >
                Create Auction
              </Link>
              <button onClick={logout} className='py-2 px-4 rounded text-white'>
                Logout
              </button>
            </>
          ) : (
            <div className='flex gap-2 items-center'>
              <Link href='/login' className='  py-2 px-4 rounded mr-2'>
                Login
              </Link>
              <Link href='/register' className='py-2 px-4 rounded'>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
