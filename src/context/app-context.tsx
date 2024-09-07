import React, { createContext, useContext, useState, ReactNode } from 'react';

interface InterviewContextType {
    isSidebarOpen: boolean;
    setSidebarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const AppContext = createContext<InterviewContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setSidebarIsOpen] = useState<boolean>(false);

    return (
        <AppContext.Provider value={{ isSidebarOpen, setSidebarIsOpen }}>
            {children}
        </AppContext.Provider>
    );
};


export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useInterviewContext must be used within an InterviewProvider');
    }
    return context;
};
