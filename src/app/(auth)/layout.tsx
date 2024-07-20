import React, { ReactNode } from 'react'

const Auth = ({children} : {children : ReactNode}) => {
  return (
    <div className='w-screen h-screen p-2 flex justify-center sm:items-center'>
        {children}
    </div>
  )
}

export default Auth