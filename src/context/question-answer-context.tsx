import { InterviewResponse, SavedQuestion } from '@/types/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FormData } from '@/types/types';


export const form = {
  role: '',
  level: '',
  questionType: '',
  tone: '',
  jobDescription: '',
}

interface InterviewContextType {
  interviewResponse: InterviewResponse | null;
  setInterviewResponse: React.Dispatch<React.SetStateAction<InterviewResponse | null>>;
  formData: FormData | typeof form;
  setFormData: React.Dispatch<React.SetStateAction<FormData | typeof form>>;
  savedQuestions: SavedQuestion[] | null,
  setSavedQuestions: React.Dispatch<React.SetStateAction<SavedQuestion[] | null>>;
}


const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const InterviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [interviewResponse, setInterviewResponse] = useState<InterviewResponse | null>(null);
  const [formData, setFormData] = useState<FormData>(form);
  const [savedQuestions, setSavedQuestions] = useState<SavedQuestion[] | null>(null);

  return (
    <InterviewContext.Provider value={{ interviewResponse, setInterviewResponse, formData, setFormData, savedQuestions, setSavedQuestions }}>
      {children}
    </InterviewContext.Provider>
  );
};


export const useInterviewContext = () => {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error('useInterviewContext must be used within an InterviewProvider');
  }
  return context;
};
