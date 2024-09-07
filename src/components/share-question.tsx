import React, { ReactNode, useState } from 'react'
import { RiLoader2Fill } from 'react-icons/ri';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge'


interface ShareQuestionProps {
    children: ReactNode,
    className: string,
    id: string
}


const getCurrentURL = () => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const baseURL = `${url.protocol}//${url.hostname}${url.port ? ":" + url.port : ""
        }`;

    return baseURL;
};

const ShareQuestion: React.FC<ShareQuestionProps> = ({ children, className, id }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleShareQuestion = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/share/${id}`, {
                method: "POST"
            });
            const data = await response.json();
            const currentUrl = getCurrentURL();
            navigator.clipboard.writeText(`${currentUrl}/share/${data.shareHash}`)
            toast.success("Share link copied");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <button disabled={isLoading} onClick={handleShareQuestion} className={twMerge("flex justify-center items-center", className)}>
            {isLoading ? <RiLoader2Fill className='animate-spin' /> : children}
        </button>
    )
}

export default ShareQuestion