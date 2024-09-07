"use client"

import Sidebar from '@/components/sidebar'
import { AppProvider } from '@/context/app-context'
import { InterviewProvider } from '@/context/question-answer-context'
import { UserProvider } from '@/context/user-context'
import { SessionProvider, useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'

const AppLayout = ({ children }: { children: ReactNode }) => {
    
    return (
        <AppProvider>
                <UserProvider>
                <InterviewProvider>
                    <div className='bg-green-50 dark:bg-neutral-900 flex w-full min-h-screen'>
                        <Sidebar />
                        {children}
                    </div>
                </InterviewProvider>
                </UserProvider>
        </AppProvider>
    )
}

export default AppLayout