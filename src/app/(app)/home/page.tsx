"use client"

import React, { useState, FormEvent, useEffect, useRef } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import AnimatedSparkle from '@/components/ui/animated-sparkle';
import { toast } from 'sonner';
import Questions from '@/components/questions-box';
import { Fraunces } from 'next/font/google';
import { useSession } from 'next-auth/react';
import { form, useInterviewContext } from '@/context/question-answer-context';
import { useAppContext } from '@/context/app-context';
import { MdOutlineStreetview } from 'react-icons/md';
import { Checkbox } from '@/components/ui/checkbox';



const fraunces = Fraunces({
  weight: [
    "300", "400", "500", "600", "700",
  ],
  subsets: [
    "latin"
  ]
})

const Home: React.FC = () => {

  const session = useSession()
  const formRef = useRef<HTMLFormElement | null>(null);

  const { interviewResponse, setInterviewResponse, formData, setFormData } = useInterviewContext();
  const { isSidebarOpen } = useAppContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (formData && !formData.role.trim()) {
      toast.error("Role is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    const userId = session.data?.user.id;

    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId
        }),
      });

      const data = await response.json();

      if (data) {
        setInterviewResponse({...data, queryInfo:formData});
      } else {
        toast.warning(data ?? "Failed to generate questions")
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("An error occurred while generating questions")
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (formRef && formRef.current && interviewResponse) {
      formRef.current.reset();
      setInterviewResponse(null);
      setFormData(form);
    }
  }, []);

  return (
    <div className='bg-neutral-50 dark:bg-neutral-900 flex w-full min-h-screen'>
      <div className="flex-grow flex justify-end">
        <div className={`${isSidebarOpen ? "w-full md:w-[calc(100%-300px)]" : "w-full"} p-4 pt-16 sm:pt-8 flex justify-center md:items-center mt-4 md:mt-0`}>
          <div className='max-w-[700px] w-full'>
            {!interviewResponse && <div className='w-full flex justify-center pb-6 sm:pb-10'>
              <div className="flex mx-auto items-center gap-1 px-2.5 text-2xl">
                <MdOutlineStreetview className='text-2xl text-green-500' /> InterviewGenie
              </div>
            </div>}
            <form ref={formRef} className='flex bg-neutral-200 border border-neutral-300 dark:border-neutral-900 dark:bg-neutral-800 rounded-xl p-4  flex-col gap-2' onSubmit={handleSubmit}>
              <div className='flex flex-col sm:flex-row items-center gap-2'>
                <div className='w-full sm:w-1/2 relative'>
                  <label
                    htmlFor={"role"}
                    className='sr-only'
                  >
                    {"Role"}
                  </label>
                  <input
                    className='w-full h-[40px] text-neutral-600 rounded-md bg-neutral-100 dark:bg-neutral-700 outline-0 ring-0 border border-neutral-200 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 active:border-neutral-500 placeholder:text-neutral-400 dark:placeholder:text-neutral-300 text-sm py-2 px-3  dark:text-neutral-200'
                    type="text"
                    id='role'
                    name='role'
                    onChange={handleChange}
                    value={formData.role as string}
                    placeholder='Role'
                    autoComplete="off"
                  />
                </div>
                <Select onValueChange={(value: string) => handleSelectChange('level', value)}>
                  <SelectTrigger className="w-full sm:w-1/2 bg-neutral-100 dark:bg-neutral-700 outline-0 ring-0 border border-neutral-200 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 active:border-neutral-500 placeholder:text-neutral-400 dark:placeholder:text-neutral-300 text-neutral-400 dark:text-neutral-200">
                    <SelectValue placeholder="Level (Optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="mid">Mid-level</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col sm:flex-row items-center gap-2'>
                <Select onValueChange={(value: string) => handleSelectChange('questionType', value)}>
                  <SelectTrigger className="w-full sm:w-1/2 bg-neutral-100 dark:bg-neutral-700 outline-0 ring-0 border border-neutral-200 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 active:border-neutral-500 placeholder:text-neutral-400 dark:placeholder:text-neutral-300 text-neutral-400 dark:text-neutral-200">
                    <SelectValue placeholder="Question Type (Optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="situational">Situational</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value: string) => handleSelectChange('tone', value)}>
                  <SelectTrigger className="w-full sm:w-1/2 bg-neutral-100 dark:bg-neutral-700 outline-0 ring-0 border border-neutral-200 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 active:border-neutral-500 placeholder:text-neutral-400 dark:placeholder:text-neutral-300 text-neutral-400 dark:text-neutral-200">
                    <SelectValue placeholder="Tone (Optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className='text-neutral-400 dark:text-neutral-200'>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="challenging">Challenging</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="job-description" className='sr-only'>Job Description</label>
                <textarea
                  className='rounded-md w-full bg-neutral-100 dark:bg-neutral-700 outline-0 ring-0 border border-neutral-200 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 active:border-neutral-500 placeholder:text-neutral-400 dark:placeholder:text-neutral-300 dark:text-neutral-200 text-sm pt-2 px-3'
                  name="jobDescription"
                  id="job-description"
                  cols={30}
                  rows={5}
                  placeholder='Job Description (Optional)'
                  onChange={handleChange}
                  value={formData.jobDescription}
                ></textarea>
              </div>
              <div className='flex gap-2 select-none text-sm pb-2 text-neutral-300 items-center'>
                <Checkbox
                  id='include-answer'
                  checked={formData.includeAnswer === "true"}
                  onCheckedChange={(checked) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      includeAnswer: checked ? "true" : "false"
                    }))
                  }}
                />
                <label htmlFor="include-answer">Include Answers</label>
              </div>
              <button
                type='submit'
                className='flex px-2.5 py-2 border bg-gradient-to-b from-green-600 to-green-900 w-fit rounded-md items-center gap-1 active:scale-95 transition-all text-white '
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate'} <AnimatedSparkle animate={isLoading ? true : false} size={20} color='white' />
              </button>
            </form>
            <Questions includeAnswer={formData.includeAnswer} isLoading={isLoading} role={formData.role} interviewResponse={interviewResponse} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;