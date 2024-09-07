"use client"

import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState, MouseEvent } from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { BiSolidLayout } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { LiaAngleRightSolid } from "react-icons/lia";
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import Setting from './setting';
import { signOut, useSession } from "next-auth/react"
import Image from 'next/image';
import { useTheme } from 'next-themes';


const Profile: React.FC = () => {
  const session = useSession();
  console.log(session);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const handleShowSetting = () => {
    setShowSetting(!showSetting);
  }
  const handleLogOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/signin" })
    } catch (error) {
      console.error(error);
    }
  }

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleEditModal = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setShowProfileMenu(prev => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        showProfileMenu &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  if (session.status !== "authenticated") {
    return <div className='fixed mx-auto bottom-0 bg-green-50 dark:bg-neutral-900 py-10 px-4 inset-x-0'>
      <div className='flex w-full gap-3  items-center  px-2 py-2 bg-green-100 dark:bg-neutral-800 border border-green-200 dark:border-neutral-700 justify-center rounded-lg h-[52px] animate-pulse' />
    </div>
  }

  return (
    <>
      <div className='fixed mx-auto bottom-0 bg-green-50 dark:bg-neutral-900 py-10 px-4 inset-x-0 ' style={{
        opacity: 1,
        transform: 'translateX(0px) translateZ(0px)'
      }}>
        <button onClick={handleEditModal} ref={buttonRef} className='flex w-full gap-3  items-center  px-2 py-2 border bg-gradient-to-b dark:from-neutral-800 dark:to-neutral-900  from-green-100 to-green-200 border-green-300 hover:border-green-400 justify-center bg-opacity-50 dark:border-neutral-800  dark:hover:border-neutral-700 rounded-lg'>
          <Image width={36} height={26} src={session.data.user.image!} alt={`${session.data.user.name} profile photo`} className='size-9 rounded-full' />
          <span className=' text-neutral-700 dark:text-neutral-300 truncate'>{session.data?.user.name}</span>
        </button>
        <AnimatePresence>
          {showProfileMenu && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 1 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              ref={modalRef}
              className='absolute bottom-24 w-[235px] sm:w-[267px] bg-gradient-to-b dark:from-neutral-800 dark:to-neutral-900 border-green-100 from-green-50 to-green-100 hover:border-green-200 rounded-lg border  dark:border-neutral-700 z-[9999] p-3 text-neutral-800 dark:text-neutral-400 flex flex-col'
            >
              <div className='flex flex-col px-2 py-1'>
                <h3 className='text-neutral-600 dark:text-neutral-400  text-lg truncate'>{session.data?.user.name}</h3>
                <p className='text-neutral-700 dark:text-neutral-500 truncate'>{session.data?.user.email}</p>
              </div>
              <span className='h-[1px] w-full  dark:bg-neutral-700 my-2' />
              <ThemeMenu />
              {/* <button onClick={handleShowSetting} className='flex mt-2 rounded-lg w-[240px] h-[38px] items-center gap-1 px-2 py-1 hover:bg-green-200 dark:hover:bg-neutral-700'>
                <IoIosSettings className='text-[20px]' /> Settings
              </button> */}
              <span className='h-[1px] w-full  dark:bg-neutral-700 my-2' />
              <button onClick={handleLogOut} className='flex rounded-lg w-[210px] sm:w-[240px] h-[38px] items-center gap-1 px-2 py-1 hover:bg-green-200 dark:hover:bg-neutral-700'>
                <IoLogOut className='text-[20px]' /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Setting showSetting={showSetting} setShowSetting={setShowSetting} />
    </>
  )
}



export default Profile

const ThemeMenu = () => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleShowThemeMenu = () => {
    setShowThemeMenu(!showThemeMenu);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setShowThemeMenu(false);
  };

  const getButtonClass = (buttonTheme: string) => {
    const baseClass = 'flex w-[120px] rounded-lg items-center gap-2 px-2 py-1 text-neutral-800 dark:text-neutral-300 hover:bg-green-300 dark:hover:bg-neutral-700';
    return theme === buttonTheme ? `${baseClass} bg-green-300 dark:bg-neutral-700` : baseClass;
  };

  return (
    <>
      <div className='relative'>
        <button
          className='flex rounded-lg w-[210px] sm:w-[240px] h-[38px] items-center justify-between px-2 py-1 hover:bg-green-200 dark:hover:bg-neutral-700 relative'
          onClick={handleShowThemeMenu}
        >
          <div className='flex items-center gap-1'>
            <BiSolidLayout className='text-lg' /> Appearance
          </div>
          <LiaAngleRightSolid className='text-sm' />
        </button>
        <AnimatePresence>
          {showThemeMenu && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className='absolute -right-[140px] sm:-right-[160px] top-0 bg-green-100 dark:bg-neutral-800 rounded-lg border border-green-200 dark:border-neutral-700 z-[99999] p-2 sm:p-3 text-sm text-neutral-600 dark:text-neutral-400 flex gap-1 flex-col'
            >
              <button
                className={getButtonClass('system')}
                onClick={() => handleThemeChange('system')}
              >
                <div className='flex items-center gap-2'>
                  <HiOutlineDesktopComputer className='text-[16px]' /> System
                </div>
              </button>
              <button
                className={getButtonClass('dark')}
                onClick={() => handleThemeChange('dark')}
              >
                <MdOutlineDarkMode className='text-[18px]' /> Dark
              </button>
              <button
                className={getButtonClass('light')}
                onClick={() => handleThemeChange('light')}
              >
                <MdOutlineLightMode className='text-[18px]' /> Light
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

