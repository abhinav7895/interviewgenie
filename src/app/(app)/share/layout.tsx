"use client"

import { InterviewProvider } from '@/context/question-answer-context'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

const Layout = ({children} : {children : ReactNode}) => {
  return (
    <InterviewProvider>
        <SessionProvider>
        {children}
        </SessionProvider>
    </InterviewProvider>
  )
}

export default Layout