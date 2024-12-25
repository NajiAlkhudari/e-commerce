'use client' 

import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className='bg-red-500 text-white justify-center text-center h-40 '>
        <h1 className='text-2xl'> Error !</h1>

      <h2>Something went wrong! , {error.message} </h2>
      <button
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}