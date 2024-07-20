"use client"

import { quicksand } from '@/app/page'
import { buttonVariants } from '@/components/ui/button'
import { useValidation } from '@/hooks/useValidation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { FormEvent } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineStreetview } from 'react-icons/md'
import { toast } from 'sonner'

const Signup = () => {
    const {
        name, 
        email, 
        password,
        validateEmail,
        validateName,
        validatePassword
    } = useValidation();


    const handleSignupForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            validateName(formData.get("name") as string)
            validateEmail(formData.get("email") as string)
            validatePassword(formData.get("password") as string)

            if(!name.isValid || !email.isValid || !password.isValid) return;

            toast.success("Form validated 🥳")
            

        } catch (error) {
            console.error(error);
        }


    }

    return (
        <div className='text-white h-fit mt-16 sm:mt-0 bg-gradient-to-b from-neutral-900 to-neutral-950 rounded border border-neutral-800 max-w-[500px] w-full p-3 py-6 sm:p-8 md:p-10'>
            <div className="flex items-center text-neutral-400 justify-center w-full gap-1 px-2.5 text-2xl">
                <MdOutlineStreetview className='text-3xl text-green-500' /> InterviewGenie
            </div>
            <form onSubmit={handleSignupForm} className={'pt-5 flex flex-col gap-4 ' + quicksand.className} action="">
                <div className='flex gap-1 flex-col'>
                    <label htmlFor="name" className='sm:text-lg text-neutral-300'>Name</label>
                    <input className='w-full border border-neutral-700 bg-neutral-800 sm:py-2 text-neutral-200 sm:px-2 p-1 outline-none focus:outline-1 focus:outline-neutral-500  rounded placeholder-neutral-500' type="text" id='name' name='name' placeholder='Abhinav Yadav' autoComplete='false' />
                    {
                        !name.isValid && <p className='text-sm text-red-400'>{name.errorMessage}</p>
                    }
                </div>
                <div className='flex gap-1 flex-col'>
                    <label htmlFor="email" className='sm:text-lg text-neutral-300'>Email</label>
                    <input className='w-full border border-neutral-700 bg-neutral-800 p-1 sm:p-2 text-neutral-200 outline-none focus:outline-1 focus:outline-neutral-500  rounded placeholder-neutral-500' type="text" id='email' name='email' placeholder='abhinav@email.com' autoComplete='false'  />
                    {
                        !email.isValid && <p className='text-sm text-red-400'>{email.errorMessage}</p>
                    }
                </div>
                <div className='flex gap-1 flex-col'>
                    <label htmlFor="password" className='sm:text-lg text-neutral-300'>Password</label>
                    <input className='w-full border border-neutral-700 bg-neutral-800 p-1 sm:p-2 text-neutral-200 outline-none focus:outline-1 focus:outline-neutral-500  rounded placeholder-neutral-500' type="password"  name='password' id='password' placeholder='••••••••••••'  />
                    {
                        !password.isValid && <p className='text-sm text-red-400'>{password.errorMessage}</p>
                    }
                </div>
                <button className={cn(buttonVariants({ className: "flex gap-1 items-center text-neutral-100 border border-green-400 text-lg sm:text-xl font-semibold p-2", }))}>
                    Sign up
                </button>
            </form>
            <div className="bg-gradient-to-r from-transparent via-neutral-300  to-transparent my-8 h-[1px] w-full" />
            <div className={'w-full ' + quicksand.className}>
                <button type='submit' className={cn(buttonVariants({ className: "flex gap-1 items-center text-white hover:text-neutral-100 text-lg sm:text-xl font-semibold w-full bg-neutral-800 hover:bg-neutral-900 border border-neutral-600 p-2", variant: "outline" }))}>
                    Sign up with <FcGoogle className='text-xl sm:text-2xl' />
                </button>
            </div>
            <div className='mt-8 text-neutral-400'>
                Already have an account? <Link className=' text-neutral-100 hover:text-neutral-50' href='/signin'>Signin</Link>
            </div>
        </div>
    )
}

export default Signup