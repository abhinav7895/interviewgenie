"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Questions from '@/components/questions-box';
import { useAppContext } from '@/context/app-context';
import { InterviewResponse, FormData } from '@/types/types';

interface SavedQuestionProps {
  params: {
    id: string;
  };
}

export default function SavedQuestion({ params }: SavedQuestionProps) {
  const { isSidebarOpen } = useAppContext();
  const [error, setError] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState('');
  const [interviewResponse, setInterviewResponse] = useState<InterviewResponse | null>(null);

  const transformApiResponse = (apiResponse: any): InterviewResponse => {
    const queryInfo: FormData = {
      role: apiResponse.role, 
      includeAnswer: apiResponse.includeAnswer as "true" | "false"
    };

    const transformedData: InterviewResponse = {
      id: apiResponse.id,
      topic: apiResponse.topic,
      questionsAndAnswers: apiResponse.questionsAndAnswers.map((qa: any) => ({
        id: qa.id,
        ques: qa.ques,
        ans: qa.ans 
      })),
      queryInfo: queryInfo
    };

    return transformedData;
  };

  const fetchQuestionData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/questions/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch question data');
      }
      const responseData = await response.json();
      
      // Transform the API response data
      const transformedResponse = transformApiResponse(responseData.data);
      setInterviewResponse(transformedResponse);
      
      // Extract role from topic or set it based on your requirements
      setRole(transformedResponse.queryInfo.role);
    } catch (error) {
      console.error('Error fetching question data:', error);
      setError("Failed to load question data. Please try again.")
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='bg-neutral-50 dark:bg-neutral-900 flex w-full min-h-screen'>
      <div className="flex-grow flex justify-end">
        <div className={`${isSidebarOpen ? "w-full md:w-[calc(100%-300px)]" : "w-full"} p-4 pt-16 sm:pt-8 flex justify-center md:items-center`}>
          <div className='max-w-[700px] w-full'>
            <Questions 
              id={interviewResponse?.id!} 
              isSave={true} 
              isLoading={isLoading} 
              role={role} 
              interviewResponse={interviewResponse} 
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}