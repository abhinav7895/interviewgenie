"use client"

import Questions from '@/components/questions-box';
import { InterviewResponse } from '@/types/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { LuLoader2 } from 'react-icons/lu';
import { MdArrowOutward, MdOutlineStreetview } from 'react-icons/md';

const Share = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [interviewResponse, setInterviewResponse] = useState<InterviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuestion = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/share-question/${id}`)
      const data = await response.json();
      if (data.success) {
        setInterviewResponse(data.data);
      }


    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchQuestion();
  }, [])

  if (!interviewResponse) {
    return (
      <div className='min-h-screen bg-neutral-50 dark:bg-neutral-950 w-screen flex  items-center justify-center'>
        <div className='w-full  flex flex-col  items-center my-10'>
          <div className='flex  w-fit items-center gap-1 text-xl'>
            <MdOutlineStreetview className='text-2xl text-green-500' /> InterviewGenie
          </div>
          <LuLoader2 className='text-xl mt-3 text-neutral-700 dark:text-neutral-300 animate-spin' />
        </div>

      </div>
    )
  }

  return (
    <div className='flex flex-col min-w-screen min-h-screen items-center p-4 bg-neutral-50 dark:bg-neutral-950'>
      <div className={`max-w-[700px] mt-10  items-center flex flex-col w-full`}>

        <>
          <div className='w-full'>
            {<Link href={"/home"} className='flex w-fit items-center px-3 py-1 bg-green-700 dark:bg-green-900 border border-green-700 hover:border-green-600 gap-2 text-green-200 dark:text-green-400 rounded-lg transition-all text-sm '>
              <div className="relative"><div className={"size-[6px] sm:size-[8px] rounded-full bg-green-500 "}></div><div className={"size-[6px] sm:size-[8px] rounded-full inset-0  absolute animate-ping bg-green-500 "}></div></div>  Get Started With InterviewGenie <MdArrowOutward />
            </Link>}
          </div>
          <Questions forShare={true} id={interviewResponse?.id} interviewResponse={interviewResponse} isSave={true} isLoading={false} />
        </>
      </div>
      <footer className='max-w-[700px] w-full' >
        <div className='w-full  flex justify-center my-10'>
          <Link href={"/home"} className='flex  w-fit items-center gap-1 text-xl'>
            <MdOutlineStreetview className='text-2xl text-green-500' /> InterviewGenie
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default Share
