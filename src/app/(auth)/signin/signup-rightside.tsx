"use client"
import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { features } from '@/constants/constant';
import { Fraunces } from 'next/font/google';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

const fraunces = Fraunces({
    weight: [
        "300", "400", "500", "600", "700",
    ],
    subsets: [
        "latin"
    ]
});

const SignupRightSide = () => {
    const [width, setWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
        }
    }, []);

    const x = useMotionValue(0);
    const baseVelocity = -100; 
    
    useAnimationFrame((t, delta) => {
        let moveBy = baseVelocity * (delta / 1000);
        
        if (x.get() + moveBy <= -width) {
            x.set(0);
        } else {
            x.set(x.get() + moveBy);
        }
    });

    return (
        <div className=''>
            <div className="flex flex-col justify-center items-center text-white overflow-hidden">
                <div className="flex flex-col gap-3 p-4 text-center mb-6 sm:mb-8">
                    <p className={"text-2xl sm:text-3xl md:text-4xl text-neutral-600 dark:text-neutral-300  flex flex-col sm:flex-row font-light " + fraunces.className}>Generate Interview <span>Questions 10x Faster</span></p>
                    <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400">Start preparing for your interviews smarter, not harder.</p>
                </div>
                <div className='w-full relative'>
                <div className='absolute left-0 inset-y-0 h-full w-12 bg-gradient-to-r from-green-100 dark:from-neutral-950 to-transparent z-[99999]' />
                <div className='absolute right-0 inset-y-0 h-full w-12 bg-gradient-to-l from-green-100 dark:from-neutral-950 to-transparent z-[99999]' />
                <InfiniteMovingCards speed='normal' items={features}  />
                </div>
            </div>
        </div>
    );
};

export const FeatureItem = ({ icon, title } : {icon : ReactNode, title : string}) => (
    <div className="flex flex-col gap-2 sm:gap-4 items-center border px-2 py-3 sm:py-5 w-[150px] sm:w-[200px] h-[100px] justify-center rounded-xl dark:bg-green-900 bg-green-800 bg-opacity-80 border-green-300  dark:bg-opacity-20 dark:border-green-950 flex-shrink-0">
        <div className="flex-shrink-0 text-lg sm:text-xl">{icon}</div>
        <div>
            <h3 className="text-center text-neutral-200 dark:text-neutral-400 text-sm sm:text-base">{title}</h3>
        </div>
    </div>
);

export default SignupRightSide;