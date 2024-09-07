import React from 'react'
import MaxWidthWrapper from './max-width-wrapper'
import { MdOutlineStreetview } from "react-icons/md";
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { GoArrowRight } from 'react-icons/go';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

const Navbar = () => {
    return (
        <MaxWidthWrapper className='py-2 fixed bg-opacity-70 backdrop-blur-2xl inset-x-0 z-50 '>
            <nav className='h-10 flex items-center justify-between bg-opacity-60 px-4 py-2'>
                <div>
                    <MdOutlineStreetview className='text-4xl text-green-500' />
                </div>
                <div className='flex gap-2'>
                    <Link className={cn(buttonVariants({ className: "flex gap-1 items-center text-neutral-800", size: "sm", variant: "outline" }))} href={""}> Star on <FaGithub className='text-lg' />  </Link>
                    <Link className={cn(buttonVariants({ className: "flex gap-1 items-center group", size: "sm" }))} href={"/signup"}> Sign up <GoArrowRight className='text-lg group-hover:translate-x-1 transition-all' /></Link>
                </div>
            </nav>
        </MaxWidthWrapper>
    )
}

export default Navbar