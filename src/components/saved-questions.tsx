"use client"

import Link from 'next/link'
import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import { BiSolidConversation } from 'react-icons/bi'
import { HiDotsHorizontal } from 'react-icons/hi'
import { MdDeleteOutline } from "react-icons/md";
import { IoShareOutline } from "react-icons/io5";
import { SavedQuestion } from '@/types/types'
import { useInterviewContext } from '@/context/question-answer-context'
import { motion } from 'framer-motion'
import ShareQuestion from './share-question'
import { RiLoader2Fill } from 'react-icons/ri'
import { useAppContext } from '@/context/app-context'
import { twMerge } from 'tailwind-merge'
import { toast } from 'sonner'


const SavedQuestions = ({ windowWidth }: { windowWidth: number }) => {
    const { savedQuestions, setSavedQuestions } = useInterviewContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { setSidebarIsOpen } = useAppContext();
    const fetchSavedQuestions = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/get-saved-questions`);
            if (!response.ok) {
                throw new Error('Failed to fetch saved questions');
            }
            const data: { success: boolean; savedQuestions: SavedQuestion[] } = await response.json();
            setSavedQuestions(data.savedQuestions);
        } catch (error) {
            console.error('Error fetching saved questions:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleCloseSidebar = () => {
        if (windowWidth < 600) {
            setSidebarIsOpen(false);
        }
    }


    useEffect(() => {
        fetchSavedQuestions();
    }, [fetchSavedQuestions]);


    return (
        <div className="py-8 flex flex-col flex-1 gap-2">
            <h2 className='text-neutral-600 dark:text-neutral-300 text-lg'>Saved</h2>
            <div className='flex flex-col gap-1 py-2'>
                {isLoading ? (
                    <HistoryShimmer />
                ) : savedQuestions && savedQuestions.length > 0 ? (
                    <>
                        {savedQuestions && savedQuestions.slice(0, 7).map((question) => (
                            <History
                                key={question.id}
                                id={question.id}
                                text={question.content}
                                shareHash={question.shareHash}
                                handleCloseSidebar={handleCloseSidebar}
                            />
                        ))}
                    </>
                ) : (
                    <p className="text-neutral-400 text-sm">No saved questions.</p>
                )}
            </div>
        </div>
    )
}

export default SavedQuestions

interface HistoryProps {
    id: string;
    text: string;
    handleCloseSidebar: () => void
    shareHash: string
}

const History: React.FC<HistoryProps> = ({ id, text, handleCloseSidebar, shareHash }) => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [isDelete, setIsDelete] = useState(false);
    const { setSavedQuestions } = useInterviewContext();
    const { isSidebarOpen, setSidebarIsOpen } = useAppContext();

    const handleEditModal = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowEditModal(prev => !prev);
    }, []);


    const handleDeleteQuestion = async () => {
        setIsDelete(true);
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
            setShowEditModal(false);
        }
    }

    const getCurrentURL = useCallback(() => {
        const currentUrl = window.location.href;
        const url = new URL(currentUrl);
        const baseURL = `${url.protocol}//${url.hostname}${url.port ? ":" + url.port : ""
            }`;
    
        return baseURL;
    }, []);
    

    const handleShareQuestion = async () => {
        try {

            const currentUrl = getCurrentURL();
            navigator.clipboard.writeText(`${currentUrl}/share/${shareHash}`)
            toast.success("Share link copied");
        } catch (error) {
            console.log(error);
            toast.error("Please try again!");
        } 
    }



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                showEditModal &&
                modalRef.current &&
                !modalRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setShowEditModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEditModal]);

    return (
        <div className='relative'>
            <Link onClick={handleCloseSidebar} href={`/home/${id}`} className='flex font-light w-full items-center gap-1 text-neutral-700 dark:text-neutral-400 group border border-transparent hover:border-neutral-200 dark:border-neutral-900 dark:hover:border-neutral-800 px-2 py-1 rounded-lg transition-all text-sm'>
                <BiSolidConversation className='shrink-0' />
                <span className='truncate'>{text}</span>
                <button
                    ref={buttonRef}
                    onClick={handleEditModal}
                    className='pl-[2px] text-neutral-600 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-200 shrink-0 opacity-0 group-hover:opacity-100 justify-center items-center'
                >
                    <HiDotsHorizontal />
                </button>
            </Link>
            {showEditModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    ref={modalRef}
                    className='absolute -right-[90px] top-full mt-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 z-[9999] p-3 flex flex-col gap-2'
                >

                    <button  onClick={handleShareQuestion} className={twMerge("flex justify-center items-center", "flex text-sm rounded-lg w-[88px] h-[30px] items-center gap-1 px-3 py-2 bg-neutral-200 text-neutral-600 dark:text-neutral-200 border-neutral-300 dark:bg-neutral-700 border dark:border-neutral-600 hover:border-neutral-500")}>
                    <IoShareOutline /> Share
                    </button>
                    <button onClick={handleDeleteQuestion} className={`flex text-sm w-[88px] rounded-lg items-center gap-1 px-3 py-2 h-[30px] dark:text-neutral-200 bg-red-200 text-red-600 border-red-300 hover:border-red-400 dark:bg-red-800 dark:bg-opacity-70 border dark:border-red-900  dark:hover:border-red-800 ${isDelete ? "opacity-70" : ""}`}>
                        {isDelete ? <RiLoader2Fill className="text-sm animate-spin" /> : <MdDeleteOutline className='text-[16px]' />} Delete
                    </button>
                </motion.div>
            )}
        </div>
    );
};

const HistoryShimmer: React.FC = () => {
    const id = useId();
    return (
        <div className='flex flex-col gap-2'>
            {Array(6).fill("").map((_, index) => (
                <div key={`${id}-${index}`} className='w-[220px] sm:w-[234px] h-[34px] rounded-lg bg-green-200 dark:bg-neutral-800 animate-pulse'></div>
            ))}
        </div>
    )
}