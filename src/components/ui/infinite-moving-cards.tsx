"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FeatureItem } from "@/app/(auth)/signin/signup-rightside";


interface InfiniteMovingCardsProps {
    items: {
        icon: ReactNode,
        title: string
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}
export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);

    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  h-[100px]  max-w-7xl overflow-hidden",
                className
            )}
        >

            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full   shrink-0 gap-1 w-max flex-nowrap",
                    start && "animate-scroll "
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className=" max-w-full  relative "
                        key={item.title}
                    >
                        <FeatureItem  {...item} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
