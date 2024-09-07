import React from 'react'
import { LuLoader2 } from 'react-icons/lu'
import { MdOutlineStreetview } from 'react-icons/md'

const loading = () => {
  return (
    <div className='min-h-screen bg-neutral-50 dark:bg-neutral-950 w-screen flex  items-center justify-center'>
      <div className='w-full flex-col  flex items-center my-10'>
          <div className='flex  w-fit items-center gap-1 text-xl'>
            <MdOutlineStreetview className='text-2xl text-green-500' /> InterviewGenie
          </div>
        <LuLoader2 className='text-xl mt-2 text-neutral-700 dark:text-neutral-300 animate-spin' />
        </div>
    </div>
  )
}

export default loading