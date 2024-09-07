"use client";

import React, { useEffect, useState } from 'react';
import { MdOutlineStreetview } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { IoBookmarks, IoClose } from "react-icons/io5";
import { VscGithubInverted } from 'react-icons/vsc';
import { FaAngleRight } from 'react-icons/fa';
import { CreateIcon } from './ui/create-icon';
import Profile from './profile';
import { RxHamburgerMenu } from "react-icons/rx";
import Link from 'next/link';
import SavedQuestions from './saved-questions';
import { useAppContext } from '@/context/app-context';
import { useTheme } from 'next-themes';
import { form, useInterviewContext } from '@/context/question-answer-context';

interface SidebarProps {
    className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
    const { isSidebarOpen, setSidebarIsOpen } = useAppContext();
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );
    const { theme } = useTheme();
    const { interviewResponse, setInterviewResponse, formData, setFormData } = useInterviewContext();

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth > 850) {
            setSidebarIsOpen(true);
        } else {
            setSidebarIsOpen(false);
        }
    }, [windowWidth, setSidebarIsOpen]);

    const handleSidebar = () => {
        setSidebarIsOpen(!isSidebarOpen);
    };

    const handleCloseSidebar = () => {
        if (windowWidth < 600) {
            setSidebarIsOpen(false);
        }
        setInterviewResponse(null)
        setFormData(form);
    };

    return (
        <>
            <div
                className={twMerge(
                    `fixed h-full bg-green-50 dark:bg-neutral-900 w-[260px] sm:w-[300px] border-r border-r-neutral-100 dark:border-r-neutral-800 transition-all z-50`,
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-[300px]',
                    theme === 'dark' ? 'text-white' : 'text-black',
                    className
                )}
            >
                <div className="py-5 px-7 flex flex-col min-h-0 flex-1 gap-4">
                    <div className="flex pb-8 pt-2 items-center justify-between">
                        <Link href={"/home"} className='flex items-center gap-1 text-neutral-600 dark:text-neutral-400 text-xl'>
                            <MdOutlineStreetview className='text-2xl text-green-600 dark:text-green-500' /> InterviewGenie
                        </Link>
                        <button
                            onClick={handleSidebar}
                            className='border rounded-md size-[20px] flex items-center justify-center hover:bg-green-100 border-neutral-500 text-neutral-700 dark:border-neutral-600 dark:text-neutral-400 active:scale-90 dark:hover:bg-neutral-800 transition-all'
                        >
                            <IoClose className='text-neutral-600 dark:text-neutral-400' />
                        </button>
                    </div>
                    <div className="pb-4 flex flex-col gap-3">
                        <Link
                            onClick={handleCloseSidebar}
                            href={"/home"}
                            className='flex items-center px-2 py-1 bg-neutral-50 bg-opacity-35 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 gap-3 text-neutral-600 dark:text-neutral-400 rounded-lg transition-all'
                        >
                            <CreateIcon />
                            New Tab
                        </Link>
                        <Link
                            onClick={handleCloseSidebar}
                            href={"/home/saved"}
                            className='flex items-center px-2 py-1 bg-neutral-50 bg-opacity-35 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 gap-3 text-neutral-600 dark:text-neutral-400 rounded-lg transition-all'
                        >
                            <IoBookmarks className='text-neutral-600 dark:text-neutral-400' />
                            Saved
                        </Link>
                        <button className='flex items-center px-2 py-1 bg-neutral-50 bg-opacity-35 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 gap-3 text-neutral-600 dark:text-neutral-400 rounded-lg transition-all'>
                            <VscGithubInverted className='text-lg text-neutral-600 dark:text-neutral-400' />
                            Star on GitHub
                        </button>
                    </div>
                    <SavedQuestions windowWidth={windowWidth} />
                    <Profile />
                </div>
            </div>
            {!isSidebarOpen && (
                <button
                    onClick={handleSidebar}
                    className='fixed top-2 md:top-1/2 left-2 md:left-0 transform md:-translate-y-1/2 flex justify-center items-center text-4xl text-neutral-600 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-200 transition-all z-50  '
                >
                    <span className='hidden md:block'>
                        <FaAngleRight />
                    </span>
                    <RxHamburgerMenu className='block bg-neutral-400 border-neutral-400  dark:bg-neutral-900 p-2 md:hidden text-4xl rounded-lg border dark:border-neutral-800 bg-opacity-35 backdrop-blur-md' />
                </button>
            )}
        </>
    );
};

export default Sidebar;
