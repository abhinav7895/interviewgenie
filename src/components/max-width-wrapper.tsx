import { cn } from '@/lib/utils'
import React, { HTMLAttributes, ReactNode } from 'react'

interface MaxWidthWrapper extends HTMLAttributes<HTMLDivElement> {
  children : ReactNode,
  className : string
}

const MaxWidthWrapper = ({className, ...props} : {className ?: string, children : ReactNode}) => {
  return (
    <div className={cn(" mx-auto max-w-screen-xl w-full px-2.5 md:px-20 ", className)} {...props}/>
  )
}

export default MaxWidthWrapper