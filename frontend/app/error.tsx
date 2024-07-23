'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className='max-h-full min-h-16 flex justify-center items-center'>
      <h2 className='text-red-500'>
        Something went wrong! we are sorry for that.
      </h2>
    </div>
  )
}
