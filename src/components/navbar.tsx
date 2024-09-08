import React from 'react'
import MaxWidthWrapper from './max-width-wrapper'
import { MdOutlineStreetview } from "react-icons/md";
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { GoArrowRight } from 'react-icons/go';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { IoLogInOutline } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";

const Navbar = () => {
    return (
        <div className="fixed inset-x-0  z-50 bg-neutral-950 bg-opacity-70 backdrop-blur-2xl  ">
        <MaxWidthWrapper className='py-2  '>
            <nav className='h-10 flex items-center justify-between bg-opacity-60 px-4 py-2'>
                <div>
                    <MdOutlineStreetview className='text-4xl text-green-500' />
                </div>
                <div className='flex gap-2'>
                    <Link className={"flex items-center gap-2 bg-opacity-40 border bg-neutral-900 h-[37px] border-neutral-700 text-neutral-200  px-3 rounded-md "} href={""}> Star on <FaGithub className='text-lg' />  </Link>
                    <Link className={"flex items-center gap-2 border bg-opacity-40 bg-green-700 h-[37px] group border-green-700 text-neutral-200  px-3 rounded-md"} href={"/signin"}>
                    Signup <FiLogIn className='text-lg' />
                    </Link>
                    
                </div>
            </nav>
        </MaxWidthWrapper>
        </div>
    )
}

export default Navbar