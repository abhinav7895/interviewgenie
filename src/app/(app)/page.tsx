import MaxWidthWrapper from "@/components/max-width-wrapper";
import Navbar from "@/components/navbar";
import RadialGradient from "@/components/radial-gradient";
import { Quicksand } from "next/font/google";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { BiCustomize, BiSolidEdit } from "react-icons/bi";
import { BsGraphDownArrow } from "react-icons/bs";
import { FaGithub, FaRegClock } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineSaveAs } from "react-icons/hi";
import { MdOutlineAutoGraph, MdOutlineStreetview } from "react-icons/md";

export const quicksand = Quicksand({ subsets: ["latin"], weight: ["400", "500", "600", "700", "300"] })

export default function Home() {
  return (
    <>
      <Navbar />
      <MaxWidthWrapper className="pt-5 px-0">
        <RadialGradient className="-z-10" />
        <div className="text-center mt-5 px-2.5 sm:mt-10 max-w-3xl mx-auto">
          <div className="w-[170px] mb-7 mx-auto relative">
            <div className="flex  flex-col absolute inset-x-0 items-center">
              <div className="font-bold">#1 AI IQS</div>
              <div className="flex gap-1">
                <AiFillStar className="text-yellow-500" />
                <AiFillStar className="text-yellow-500" />
                <AiFillStar className="text-yellow-500" />
                <AiFillStar className="text-yellow-500" />
                <AiFillStar className="text-yellow-500" />
              </div>
            </div>
            <img src="./flowers.svg" className="w-[170px]" alt="" />
          </div>
          <h1 className=" text-2xl sm:text-3xl md:text-4xl  text-balance  font-semibold mb-8">Generate Interview Questions <br />
            <span className="text-green-500">10x Faster</span> with <span className="text-green-500">AI-Powered Precision</span></h1>
          <p className="text-balance mb-8">
            Get AI-Generated Interview Questions Tailored to
            <br />
            <span className="font-semibold"> Your Needs in Seconds</span>
          </p>

          <div>
            <Link href={"/home"} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#22c55d_50%,#22c55d_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white-950 px-3 py-1 text-sm font-medium bg-gradient-to-r from-green-600 to-green-950 text-white backdrop-blur-3xl">
                Generate Questions
              </span>
            </Link>
          </div>

          <div className={" grid mt-10  grid-cols-12 w-full gap-2 " + quicksand.className}>
            <div className=" hover:rotate-1 transition-all rounded-md gap-2 bg-opacity-10 bg-green-950 border font-normal flex flex-col items-center border-green-950 hover:border-green-900 p-6 col-span-12 md:col-span-4 ">
              <FaRegClock className="text-xl text-orange-500" />
              <p className="text-balance text-lg text-neutral-300"><span className="text-xl text-white font-bold">45 minutes </span> <br />
                are wasted per day on preparing interview questions.</p>
            </div>
            <div className=" hover:rotate-1 transition-all rounded-md gap-2 bg-opacity-10 bg-green-950 border font-normal flex flex-col items-center border-green-950 hover:border-green-900 p-6 col-span-12 md:col-span-4 ">
              <MdOutlineAutoGraph className="text-xl text-blue-500" />
              <p className="text-balance text-neutral-300  text-lg"><span className="text-xl text-white font-bold">40%</span> <br />
                increase in candidate engagement with customized questions.</p>
            </div>
            <div className=" hover:rotate-1 transition-all rounded-md gap-2 bg-opacity-10 bg-green-950 border font-normal flex flex-col items-center border-green-950 hover:border-green-900 p-6 col-span-12 md:col-span-4 ">
              <BsGraphDownArrow className="text-xl text-green-500" />
              <p className="text-balance  text-lg text-neutral-300"><span className="text-xl text-white font-bold">50%</span> <br />
                reduction in interview preparation time for hiring managers.</p>
            </div>
          </div>

          <div className="mt-[100px] space-y-8 sm:space-y-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-start">
              <span className="text-green-500">Generate</span> Questions <br />
              and <span className="text-green-500">Ace Your Interviews  </span>
            </h2>

            <div className={"flex  flex-col gap-8 " + quicksand.className}>
              <div className=" space-y-2 group text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl text-neutral-200 flex gap-2 items-center"> <BiCustomize className="text-orange-400 group-hover:translate-x-1 transition-transform" /> Customize your interview questions</h3>
                <p className=" sm:text-lg text-neutral-400 font-normal">
                  Customize your interview questions based on parameters like topic, <span className=" underline underline-offset-2 decoration-dotted decoration-neutral-500">language, technical skills, aptitude, behavioral traits</span> and specific companies. Tailor your preparation to match your specific needs.
                </p>
              </div>
              <div className=" space-y-2 text-left group">
                <h3 className="text-lg sm:text-xl md:text-2xl text-neutral-200 flex gap-2 items-center"> <HiOutlineSaveAs className="text-blue-400 group-hover:translate-x-1 transition-transform" /> Save Your Generated Questions</h3>
                <p className=" sm:text-lg text-neutral-400 font-normal">
                  Easily save the questions you generate in your account. Keep all your customized <span className=" underline underline-offset-2 decoration-dotted decoration-neutral-500">interview questions organized and accessible</span> whenever you need them.
                </p>
              </div>
              <div className=" space-y-2 text-left group">
                <h3 className="text-lg sm:text-xl md:text-2xl text-neutral-200 flex gap-2 items-center"> <BiSolidEdit className="text-purple-400 group-hover:translate-x-1 transition-transform" /> Manage Your Previous Questions</h3>
                <p className=" sm:text-lg text-neutral-400 font-normal">
                  <span className=" underline underline-offset-2 decoration-dotted decoration-neutral-500">Access and manage all your previously generated questions.</span> Edit, update, or review them to ensure your interview preparation stays relevant and up-to-date.
                </p>
              </div>
            </div>

          </div>

          <div className="mt-[100px] space-y-8 sm:space-y-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-start">
              What Our
              <span className="text-green-500"> Users</span> Say
            </h2>

            <div className={"grid grid-cols-12 gap-4 " + quicksand.className}>
              <div className=" bg-neutral-900 border border-neutral-800 bg-opacity-90 p-4 col-span-12 sm:col-span-4 rounded-sm flex flex-col justify-between group text-left">
                <p className=" sm:text-lg text-neutral-300 font-normal">
                  The AI interview question generator <span className="underline font-semibold underline-offset-2 decoration-neutral-600">saved me so much time!</span> I was able to prepare for my interviews with ease and confidence
                </p>
                <h4 className="mt-4 text-neutral-400 font-medium text-lg">- Hasan Sajid</h4>
              </div>
              <div className=" col-span-12 sm:col-span-4  bg-neutral-900 border border-neutral-800 bg-opacity-90 p-4 rounded-sm flex flex-col justify-between group text-left">
                <p className=" sm:text-lg text-neutral-300 font-normal">
                  An <span className="underline font-semibold underline-offset-2 decoration-neutral-600">amazing tool for anyone </span> preparing for technical interviews. The questions were spot on and very relevant.
                </p>
                <h4 className="mt-4 text-neutral-400 font-medium text-lg">- Ramdularey Yadav</h4>
              </div>
              <div className="col-span-12 sm:col-span-4 bg-neutral-900 border border-neutral-800 bg-opacity-90 p-4 rounded-sm flex flex-col justify-between group text-left">
                <p className=" sm:text-lg text-neutral-300 font-normal">
                  Highly <span className="underline underline-offset-2 font-semibold  decoration-neutral-600">recommend this site for both recruiters and candidates. </span> The ability to generate customized questions is a game-changer.
                </p>
                <h4 className=" mt-4 text-neutral-400 font-medium text-lg">- Abhinav Yadav</h4>
              </div>

            </div>

          </div>


        </div>

        <footer className="py-[40px] mt-[70px] sm:py-[100px] sm:mt-[150px]  border-t-2 border-neutral-700 flex justify-between items-center">
          <div className="flex items-center gap-1 px-2.5 sm:text-2xl">
            <MdOutlineStreetview className='text-xl sm:text-3xl text-green-500' /> InterviewGenie
          </div>
          <div className="flex gap-2 sm:gap-4 px-2.5 text-xl sm:text-3xl items-center">
            <FaGithub /> <FaXTwitter />
          </div>
        </footer>
      </MaxWidthWrapper>
    </>
  );
}
