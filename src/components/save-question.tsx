import React, { useState } from 'react'
import { MdOutlineBookmarks } from 'react-icons/md'
import { MdDone } from "react-icons/md";
import { useInterviewContext } from '@/context/question-answer-context';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { RiLoader2Fill } from 'react-icons/ri';


const SaveQuestion = ({ isAlreadySave = false }: { isAlreadySave?: boolean }) => {
    const [isSave, setIsSave] = useState<"no" | "saving" | "done">(isAlreadySave ? "done" : "no");
    const { interviewResponse, formData, setSavedQuestions } = useInterviewContext();
    const { data } = useSession();

    const handleSaveQuestion = async () => {
        if (!data) {
            toast.error("Not authenticated")
            return;
        }
        if (!interviewResponse) {
            toast.error("No interview response to save")
            return;
        }

        setIsSave("saving");

        try {
            const response = await fetch('/api/store-questions-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...interviewResponse,
                    ...formData
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save question');
            }

            const { success, data, error } = await response.json();
            if (success) {
                setIsSave("done");
                setSavedQuestions((prevQuestions) => {
                    if (!prevQuestions) {
                        return [data];
                    }
                    const updatedQuestions = [data, ...prevQuestions];
                    return updatedQuestions;
                });
            } else {
                throw new Error(error || 'Failed to save question');
            }
        } catch (error) {
            console.error('Error saving question:', error);
            toast.error("Failed to save question");
            setIsSave("no");
        }
    }

    return (
        <button
            onClick={handleSaveQuestion}
            className=' text-green-800 dark:text-neutral-300 flex bg-green-200 dark:bg-neutral-700 border w-[30px] h-[25px] rounded-md justify-center border-green-300 dark:border-neutral-500 hover:border-green-400 dark:hover:border-neutral-400 items-center active:scale-90 p-1 transition-all  '
            disabled={isSave !== "no"}
        >
            {isSave === "no" ? <MdOutlineBookmarks /> : isSave === "done" ? <MdDone className='text-green-500' /> : <RiLoader2Fill className='animate-spin' />}
        </button>
    )
}

export default SaveQuestion