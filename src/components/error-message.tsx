import { Fraunces } from 'next/font/google';
import React from 'react'

const fraunces = Fraunces({
    weight: [
        "300", "400", "500", "600", "700",
    ],
    subsets: [
        "latin"
    ]
});

const ErrorMessage = ({message} : {message : string}) => {
    return (
        <div className="mt-7 w-full flex flex-col gap-2 bg-red-50 dark:bg-red-800 border dark:bg-opacity-10 dark:border-red-900 rounded-xl p-4">

            <div className='py-4'>
                <h2 className={`text-xl text-green-900 dark:text-neutral-300 sm:text-2xl font-light ${fraunces.className}`}>Error </h2>
            </div>
            <div>
                <p className='text-sm'>
                    {message}
                </p>
            </div>
        </div>
    )
}

export default ErrorMessage