
import React, { ReactNode } from 'react'

const Auth = async ({children} : {children : ReactNode}) => {
  return (
    <div className='w-screen bg-green-50 dark:bg-neutral-950 h-screen flex justify-center sm:items-center'>
        {children}
    </div>
  )
}

export default Auth