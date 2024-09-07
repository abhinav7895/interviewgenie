'use client';
import {  SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface ClientComponentProps {
    children : ReactNode
}

const ClientComponent:React.FC<ClientComponentProps> = ({children}) => {
    
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default ClientComponent;