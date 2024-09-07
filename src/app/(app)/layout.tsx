
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
interface AppLayoutProps {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {

  return (
    <>
    <SessionProvider>
          {children}
    </SessionProvider>
    </>
  )
}

export default AppLayout