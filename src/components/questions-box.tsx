import React, { useState, useCallback, useEffect } from 'react';
import { HiOutlineClipboard, HiOutlineClipboardCheck, HiOutlineDownload } from 'react-icons/hi';
import { Fraunces } from 'next/font/google';
import { jsPDF } from 'jspdf';
import { RiLoader2Fill } from 'react-icons/ri';
import {  IoShareOutline } from 'react-icons/io5';
import { InterviewResponse } from '@/types/types';
import SaveQuestions from './save-question';
import ShareQuestion from './share-question';

const fraunces = Fraunces({
    weight: [
        "300", "400", "500", "600", "700",
    ],
    subsets: [
        "latin"
    ]
});

interface QuestionsProps {
    interviewResponse: InterviewResponse | null
    role?: string;
    isLoading: boolean;
    isSave?: boolean
    id?: string
    forShare ?: boolean
}

const Questions: React.FC<QuestionsProps> = ({ interviewResponse, role, isLoading, isSave, id, forShare = false }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const handleShowAnswer = () => setShowAnswer(!showAnswer);

    const copyToClipboard = useCallback(() => {
        if (copySuccess) return;
        const textToCopy = interviewResponse?.questionsAndAnswers?.map(({ ques, ans }, index) =>
            `${index + 1}. ${ques}\nAnswer: ${ans}\n\n`
        ).join('');

        navigator.clipboard.writeText(textToCopy as string).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 3000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }, [interviewResponse, copySuccess]);

    const downloadPDF = useCallback(() => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 10;
        let y = 20;
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text(interviewResponse?.topic as string, margin, y);
        y += 10;

        interviewResponse?.questionsAndAnswers.forEach(({ ques, ans }, index) => {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);

            const questionLines = doc.splitTextToSize(`${index + 1}. ${ques}`, pageWidth - 2 * margin);
            doc.text(questionLines, margin, y);
            y += questionLines.length * 7;

            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);

            const answerLines = doc.splitTextToSize(`Answer: ${ans}`, pageWidth - 2 * margin);
            doc.text(answerLines, margin, y);
            y += answerLines.length * 5 + 5;

            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        });

        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Generated by InterviewGenie', pageWidth / 2, 290, { align: 'center' });

        doc.save('interview_questions.pdf');
    }, [interviewResponse, role]);

    const handleDownload = () => {
        setIsDownloading(true);
        setTimeout(() => {
            downloadPDF();
        }, 2000);
    }

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (isDownloading) {
            timer = setTimeout(() => setIsDownloading(false), 2000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        }
    }, [isDownloading]);

    if (isLoading) {
        return <QuestionShimmer />;
    }

    return (
        (interviewResponse && interviewResponse.questionsAndAnswers.length > 0) && (
            <div className="mt-7 w-full flex flex-col gap-2 bg-green-50 dark:bg-neutral-800 border dark:border-neutral-700 rounded-xl p-4">
                <div className='w-full rounded-lg flex items-center justify-between gap-2'>
                    <div className='flex items-center gap-2'>
                        <button
                            className='flex text-green-800 dark:text-neutral-300 bg-green-200 dark:bg-neutral-700 border w-[30px] h-[25px] rounded-md justify-center border-green-300 dark:border-neutral-500 hover:border-green-400 dark:hover:border-neutral-400 items-center active:scale-90 p-1 transition-all'
                            onClick={copyToClipboard}
                        >
                            {copySuccess ? <HiOutlineClipboardCheck /> : < HiOutlineClipboard />}
                        </button>
                        {!forShare && <SaveQuestions isAlreadySave={isSave ? isSave : false} />}
                        <button
                            className={`flex text-green-800 dark:text-neutral-300 bg-green-200 dark:bg-neutral-700 border w-[30px] h-[25px] rounded-md justify-center border-green-300 dark:border-neutral-500 hover:border-green-400 dark:hover:border-neutral-400 items-center active:scale-90 p-1 transition-all ${isDownloading ? " opacity-80" : "active:scale-90 "}`}
                            onClick={handleDownload}
                            disabled={isDownloading}
                        >
                            {isDownloading ? <RiLoader2Fill className='animate-spin' /> : <HiOutlineDownload />}
                        </button>
                        {id && !forShare && <ShareQuestion id={id} className='flex  text-green-800 dark:text-neutral-300 bg-green-200 dark:bg-neutral-700  border-green-300 dark:border-neutral-500 hover:border-green-400 dark:hover:border-neutral-400 items-center active:scale-90 p-1 transition-all border w-[30px] h-[25px] rounded-md justify-center'>
                            <IoShareOutline />
                        </ShareQuestion>}
                    </div>
                    <div>
                        <button
                            className='flex text-green-800 dark:text-neutral-300 bg-green-200 dark:bg-neutral-700  border-green-300 dark:border-neutral-500 hover:border-green-400 dark:hover:border-neutral-400 w-[110px] h-[25px] justify-center rounded-md items-center transition-all gap-1 border text-sm'
                            onClick={handleShowAnswer}
                        >
                            {showAnswer ? "Hide" : "Show"} Answer
                        </button>
                    </div>
                </div>
                <div className='py-4'>
                    <h2 className={`text-xl text-green-900 dark:text-neutral-400 sm:text-2xl font-light ${fraunces.className}`}>{interviewResponse.topic}</h2>
                </div>
                {interviewResponse.questionsAndAnswers.map(({ ques, ans, id }, index) => (
                    <div className='flex border rounded-lg bg-neutral-50 border-neutral-200   dark:border-neutral-600 dark:bg-neutral-700 p-2.5 flex-col gap-1' key={id}>
                        <p className='text-neutral-600 dark:text-neutral-200'>{index + 1}. {ques}</p>
                        {showAnswer && <p className='text-sm text-neutral-700 dark:text-neutral-300 font-light'><span className='text-neutral-600 dark:text-neutral-200 font-semibold'>Answer: </span>{ans}</p>}
                    </div>
                ))}
            </div>
        )
    );
};

export default Questions;

export const QuestionShimmer = () => {
    return (
        <div className="mt-7 flex flex-col gap-2  bg-green-100 dark:bg-neutral-800 border border-green-200 dark:border-neutral-700 rounded-xl p-4">
            <div className={`py-4 w-[200px] sm:w-[300px] h-[20px] rounded-lg bg-green-200 dark:bg-neutral-600 animate-pulse `}></div>
            <div className='flex flex-col gap-2'>
                {Array(5).fill("").map((_, index) => (
                    <div className='rounded-lg w-full h-[40px] animate-pulse bg-green-300 dark:bg-neutral-700' key={index} />
                ))}
            </div>
        </div>
    );
};