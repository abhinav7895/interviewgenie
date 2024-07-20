import React from 'react'
import { TbLoader } from "react-icons/tb";

const loading = () => {
  return (
    <div>
        <TbLoader className='animate-spin text-2xl' />
    </div>
  )
}

export default loading