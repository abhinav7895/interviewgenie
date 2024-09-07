import { quicksand } from '@/app/(app)/page'
import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { MdOutlineStreetview } from 'react-icons/md'
import SignupRightSide from './signup-rightside'
import RadialGradient from '@/components/radial-gradient'
import { signIn } from '@/auth';
import Link from 'next/link'


const Signin = async () => {

    const handeSignin = async () => {
        "use server"
        await signIn("google", {
            redirectTo: "/home",
            redirect: true
        })
    }

    return (
        <div className='flex flex-col p-4 h-full relative items-center justify-center w-full'>
            <div className='flex flex-col w-full max-w-md justify-center items-center'>
                <div className={"flex items-center top-10 text-neutral-600 dark:text-neutral-400 justify-center w-full gap-1 px-2.5 text-2xl  sm:text-3xl font-light "}>
                    <MdOutlineStreetview className='text-2xl sm:text-3xl shrink-0 text-green-500' /> InterviewGenie
                </div>
                <form action={handeSignin} className={'mt-8 sm:mt-10 flex flex-col items-center justify-center gap-4 w-full ' + quicksand.className}>
                    <button type='submit' className={"flex text-lg sm:text-xl border py-2  sm:py-4 px-4 sm:px-6 bg-gradient-to-b from-green-700 to-green-900 rounded-2xl font-semibold items-center gap-2 text-white dark:text-neutral-300 justify-center hover:to-green-950 transition-all active:scale-95"}>
                        <FaGoogle className='text-lg sm:text-xxl' />Continue with Google
                    </button>
                    <div className='text-xs hidden sm:block p-4 sm:p-1 sm:text-sm text-neutral-500'>By continuing, you agree to the <Link className='text-neutral-400' href="https://www.interviewgenie.live/tos">Terms of Service</Link> and <Link className='text-neutral-400' href='https://www.interviewgenie.live/privacy'>Privacy Policy</Link></div>
                </form>
                <RadialGradient origin='top left' className="-z-10" />
                <RadialGradient origin='bottom right' className="-z-10 hidden sm:block" />
            </div>
            <div className="bg-gradient-to-l my-6  max-w-[800px] sm:my-16 from-transparent via-green-300 dark:via-neutral-300 to-transparent w-full h-[1px] " />
            <div className="w-full max-w-[800px]">
                <SignupRightSide />
                <div className='text-xs block px-4 text-center sm:hidden mt-10 sm:text-sm text-neutral-500'>By continuing, you agree to the <Link className='text-neutral-400' href="https://www.interviewgenie.live/tos">Terms of Service</Link> and <Link className='text-neutral-400' href='https://www.interviewgenie.live/privacy'>Privacy Policy</Link></div>
            </div>
        </div>
    )
}

export default Signin