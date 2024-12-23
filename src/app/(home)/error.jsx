'use client' 

import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='bg-red-500 text-white justify-center text-center h-40 '>
        <h1 className='text-2xl'> Error !</h1>

      <h2>Something went wrong! , {error.message} </h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}