import { quicksand } from '@/app/page'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineStreetview } from 'react-icons/md'

const Signin = () => {
    return (
        <div className='text-white bg-gradient-to-b from-neutral-900 to-neutral-950 rounded border border-neutral-800 max-w-[500px] w-full p-10'>
            <div className="flex items-center text-neutral-400 justify-center w-full gap-1 px-2.5 sm:text-2xl">
                <MdOutlineStreetview className='text-xl sm:text-3xl text-green-500' /> InterviewGenie
            </div>
            <form className={'pt-5 flex flex-col gap-4 ' + quicksand.className} action="">
                <div className='flex gap-1 flex-col'>
                    <label htmlFor="email" className='text-lg text-neutral-300'>Email</label>
                    <input className='w-full border border-neutral-700 bg-neutral-800 py-2 text-neutral-200 px-2 outline-none focus:outline-1 focus:outline-neutral-500  rounded placeholder-neutral-500' type="email" id='email' placeholder='abhinav@email.com' />
                </div>
                <div className='flex gap-1 flex-col'>
                    <label htmlFor="password" className='text-lg text-neutral-300'>Password</label>
                    <input className='w-full border border-neutral-700 bg-neutral-800 py-2 text-neutral-200 px-2 outline-none focus:outline-1 focus:outline-neutral-500  rounded placeholder-neutral-500' type="password" id='password' placeholder='••••••••••••' />
                </div>
                <button className={cn(buttonVariants({ className: "flex gap-1 items-center text-neutral-100 border border-green-400 text-xl font-semibold", size: "lg" }))}>
                    Sign in
                </button>
            </form>
            <div className="bg-gradient-to-r from-transparent via-neutral-300  to-transparent my-8 h-[1px] w-full" />
            <div className={'w-full ' + quicksand.className}>
                <button className={cn(buttonVariants({ className: "flex gap-1 items-center text-white hover:text-neutral-100 text-xl font-semibold w-full bg-neutral-800 hover:bg-neutral-900 border border-neutral-600", size: "lg", variant: "outline" }))}>
                    Sign in with <FcGoogle className='text-2xl' />
                </button>
            </div>
            <div className='mt-8 text-neutral-400'>
                Don&apos;t have an account? <Link className=' text-neutral-100 hover:text-neutral-50' href='/signup'>Signup</Link>
            </div>
        </div>
    )
}

export default Signin