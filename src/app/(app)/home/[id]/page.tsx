"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Questions from '@/components/questions-box';
import { useAppContext } from '@/context/app-context';
import { InterviewResponse } from '@/types/types';

interface SavedQuestionProps {
  params: {
    id: string;
  };
}

export default function SavedQuestion({ params }: SavedQuestionProps) {
  const session = useSession();
  const router = useRouter();
  const { isSidebarOpen } = useAppContext();
  
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState('');
  const [interviewResponse, setInterviewResponse] = useState<InterviewResponse | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {

      fetchQuestionData();
  }, []);

  const fetchQuestionData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/questions/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch question data');
      }
      const data = await response.json();
      setInterviewResponse(data.data)
    } catch (error) {
      console.error('Error fetching question data:', error);
      setError('Failed to load question data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className=' bg-neutral-50 dark:bg-neutral-900 flex w-full min-h-screen'>
      <div className="flex-grow flex justify-end">
        <div className={`${isSidebarOpen ? "w-full md:w-[calc(100%-300px)]" : "w-full"} p-4 pt-16 sm:pt-8 flex justify-center md:items-center`}>
          <div className='max-w-[700px] w-full'>
            <Questions id={interviewResponse?.id!} isSave={true} isLoading={isLoading} role={role} interviewResponse={interviewResponse} />
          </div>
        </div>
      </div>
    </div>
  );
}