"use client"

import React, { useState, useEffect } from 'react';
import { QuestionShimmer } from '@/components/questions-box';
import { Fraunces } from 'next/font/google';
import { useInterviewContext } from '@/context/question-answer-context';
import { useAppContext } from '@/context/app-context';
import Link from 'next/link';
import { IoBookmarksOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { SavedQuestion } from '@/types/types';
import { MdDeleteOutline } from "react-icons/md";
import { CreateIcon } from '@/components/ui/create-icon';
import { RiLoader2Fill } from 'react-icons/ri';
import { timeSince } from '@/lib/utils';
RiLoader2Fill

const fraunces = Fraunces({
    weight: [
        "300", "400", "500", "600", "700",
    ],
    subsets: [
        "latin"
    ]
})

const Saved: React.FC = () => {
    const { isSidebarOpen } = useAppContext();
    const [showDelete, setShowDelete] = useState<string>("");
    const [isDelete, setIsDelete] = useState(false);
    const { savedQuestions, setSavedQuestions } = useInterviewContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredQuestions, setFilteredQuestions] = useState<SavedQuestion[]>([]);
    const [isDeleteAll, setIsDeleteAll] = useState(false);

    const handleShowDelete = (id: string) => {
        setShowDelete(id);
    }

    const handleHideDelete = () => {
        if (isDelete) {
            return;
        }
        setShowDelete("");
    }

    const handleDeleteAll = async () => {
        setIsDeleteAll(true)
        try {
            const response = await fetch("/api/delete-user-questions", {
                method: "DELETE",
            });

            const data = await response.json();
            if (data.success) {
                setSavedQuestions([]);
                setFilteredQuestions([]);
            }

        } catch (error) {
            console.log("Error while deleting the question ", error);
        } finally {
            setIsDeleteAll(false);

        }
    }

    const handleDeleteQuestion = async (id : string) => {
        setIsDelete(true);
        setShowDelete(id);
        try {
            const response = await fetch("/api/delete-saved-question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(id),
            });

            setSavedQuestions((prevSavedQuestions) => {
                if (prevSavedQuestions) {
                    const updatedSavedQuestion = prevSavedQuestions.filter((question) => question.id !== id);
                    return updatedSavedQuestion;
                }
                return prevSavedQuestions;
            });

        } catch (error) {
            console.log("Error while deleting the question ", error);
        } finally {
            setIsDelete(false);
            setShowDelete("");
        }
    }

    useEffect(() => {
        if (savedQuestions) {
            const filtered = savedQuestions.filter(question =>
                question.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredQuestions(filtered);
        }
    }, [savedQuestions, searchTerm]);

    return (
        <div className='bg-neutral-50 dark:bg-neutral-900 relative flex w-full min-h-screen'>
            {!isSidebarOpen && <Link href={"/home"} className='flex items-center px-2 py-1 bg-neutral-200 border-neutral-300 hover:border-neutral-400 text-neutral-600 dark:bg-neutral-800 border dark:border-neutral-700 dark:hover:border-neutral-600 gap-2 dark:text-neutral-400 rounded-lg transition-all absolute top-4 right-4'>
                <CreateIcon />
                New Tab
            </Link>}
            <div className="flex-grow flex justify-end">
                <div className={`${isSidebarOpen ? "w-full md:w-[calc(100%-300px)]" : "w-full"} p-4 pt-16 sm:pt-8 flex justify-center `}>
                    <div className='max-w-[700px] w-full'>
                        <div className={'text-2xl text-green-900 dark:text-neutral-300 my-5 flex items-center gap-2 font-light ' + fraunces.className}>
                            <IoBookmarksOutline className='text-xl' /> Your Saved Questions
                        </div>
                        <div className='mb-4 relative'>
                            <input
                                className='w-full h-[40px] rounded-md bg-neutral-100 dark:bg-neutral-700 outline-0 ring-0 border border-neutral-200 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 active:border-neutral-500 placeholder:text-neutral-400 dark:placeholder:text-neutral-300 text-sm py-2 px-3 pl-9 '
                                type="text"
                                autoComplete="off"
                                placeholder="Search saved questions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <IoIosSearch className='absolute top-2 left-2 text-neutral-400 text-3xl size-[23px]' />
                        </div>
                        {
                            savedQuestions === null ? (
                                <div>
                                    <QuestionShimmer />
                                </div>
                            ) : savedQuestions.length === 0 ? (
                                <div className='text-neutral-400 text-center py-4'>You have no saved questions.</div>
                            ) : (
                                <div className='flex flex-col gap-3'>
                                    <div>
                                        <button onClick={handleDeleteAll} className='px-2 py-1 bg-green-800 border border-green-700 hover:border-green-600 gap-2 text-green-300 dark:text-green-400 rounded-lg transition-all text-sm w-[90px] h-[30px] flex justify-center items-center'>
                                            {isDeleteAll ? <RiLoader2Fill className=' animate-spin text-base' /> : "Delete All"}
                                        </button>
                                    </div>
                                    {filteredQuestions.length > 0 ? (
                                        filteredQuestions.map(({ id, content, createdAt }) => (
                                            <div key={id} onMouseEnter={() => handleShowDelete(id)} onMouseLeave={handleHideDelete} className='relative'>
                                                <Link  href={`/home/${id}`} className='flex items-center justify-between font-light w-full text-neutral-400 group border bg-gradient-to-b from-green-100 to-green-200 border-green-100 hover:border-green-300 dark:from-neutral-800 dark:to-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-700 px-3 rounded-lg transition-all h-[65px] overflow-hidden'>
                                                    <div className='flex flex-col w-full text-base sm:text-lg justify-center'>
                                                        <p className='w-full text-neutral-600 dark:text-neutral-300 line-clamp-1 max-w-[85%] '>{content}</p>
                                                        <span className='text-xs sm:text-sm  text-neutral-500 dark:text-neutral-500'>
                                                            {timeSince(createdAt)} 
                                                        </span>
                                                    </div>
                                                </Link>
                                                {(showDelete === id ) && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDeleteQuestion(id);
                                                        }}
                                                        className='p-2 bg-red-100 dark:bg-neutral-800 rounded-md border border-red-300 dark:border-neutral-700 absolute right-2 top-[14px] hover:border-red-400 dark:hover:border-neutral-600 size-[38px]'
                                                    >
                                                        {(isDelete && showDelete === id)  ? <RiLoader2Fill className=' animate-spin text-red-500 text-lg' /> : <MdDeleteOutline className='text-xl text-red-500' />}
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className='text-neutral-400 text-center py-4'>No matching questions found.</div>
                                    )}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Saved;