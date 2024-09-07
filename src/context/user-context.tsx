import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
    userInfo : User | null,
    setUserInfo : React.Dispatch<React.SetStateAction<User | null>>;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const session = useSession();
    useEffect(() => {
        if (session.status === "authenticated") {
            setUserInfo(session.data.user);
        } else {
            setUserInfo(null);
        }
    }, [session])
    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useInterviewContext must be used within an InterviewProvider');
    }
    return context;
};
