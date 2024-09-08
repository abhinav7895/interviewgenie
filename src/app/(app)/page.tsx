import MaxWidthWrapper from "@/components/max-width-wrapper";
import Navbar from "@/components/navbar";
import RadialGradient from "@/components/radial-gradient";
import AnimatedSparkle from "@/components/ui/animated-sparkle";
import { Fraunces, Quicksand } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { BiCustomize, BiSolidEdit } from "react-icons/bi";
import { BsGraphDownArrow } from "react-icons/bs";
import { FaGithub, FaRegClock } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineSaveAs } from "react-icons/hi";
import { MdOutlineAutoGraph, MdOutlineStreetview } from "react-icons/md";
import { RiAiGenerate } from "react-icons/ri";


const fraunces = Fraunces({
  weight: [
    "300", "400", "500", "600", "700",
  ],
  subsets: [
    "latin"
  ]
})
export const quicksand = Quicksand({ subsets: ["latin"], weight: ["400", "500", "600", "700", "300"] })

export default function Home() {
  return (
    <>
    
      
      <Navbar />
      <div className="bg-neutral-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <MaxWidthWrapper className="pt-[90px] sm:pt-[120px] px-3 ">
        <RadialGradient className="-z-10" />
        <div className="text-center mt-5 px-2.5 sm:mt-10  mx-auto">
          <h1 className={" text-2xl sm:text-3xl md:text-5xl  text-balance mb-8 text-neutral-200 " + fraunces.className}>Generate Interview Questions <br />
            <span className="text-green-500">10x Faster</span> with <span className="text-green-500">AI-Powered Precision</span></h1>
          <p className="text-balance text-base text-neutral-300 sm:text-xl mb-8">
            Get AI-Generated Interview Questions Tailored to
            <br />
            <span className="font-semibold text-neutral-100"> Your Needs in Seconds</span>
          </p>

          <div>
            <Link href={"/home"} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] active:scale-90 transition-all">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#22c55d_50%,#22c55d_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white-950 px-3 py-1 text-sm font-medium bg-gradient-to-r from-green-600 to-green-950 text-white backdrop-blur-3xl">
                Generate Questions
              </span>
            </Link>
          </div>
          <div className="w-full  py-10 max-w-[100vw] overflow-hidden">
            <Image
              src="/ss-1.webp"
              alt="Screenshot"
              width={1920}
              height={1080}
              layout="responsive"
              className="w-full shadow-lg h-auto rounded-lg border border-neutral-600"
            />
          </div>

          <div className="flex flex-col space-y-8 sm:space-y-16 mt-[60px] sm:mt-[100px]">
            <h2 className={"text-2xl sm:text-3xl md:text-4xl text-start text-neutral-200 " + fraunces.className}>
              Key <span className="text-green-500">Benefits</span>  of  <br />
              <span className="text-green-500">AI-Powered Interview Preparation  </span>

            </h2>
            <div className={" grid mt-10  grid-cols-12 w-full gap-2 " + quicksand.className}>
              <div className=" hover:rotate-1 transition-all rounded-md gap-2 bg-opacity-10 bg-green-950 border font-normal flex flex-col items-center border-green-900 hover:border-green-800 p-6 col-span-12 md:col-span-4 ">
                <FaRegClock className="text-xl text-orange-500" />
                <p className="text-balance text-lg text-neutral-300"><span className="text-xl text-white font-bold">45 minutes </span> <br />
                  are wasted per day on preparing interview questions.</p>
              </div>
              <div className=" hover:rotate-1 transition-all rounded-md gap-2 bg-opacity-10 bg-green-950 border font-normal flex flex-col items-center border-green-900 hover:border-green-800 p-6 col-span-12 md:col-span-4 ">
                <MdOutlineAutoGraph className="text-xl text-blue-500" />
                <p className="text-balance text-neutral-300  text-lg"><span className="text-xl text-white font-bold">40%</span> <br />
                  increase in candidate engagement with customized questions.</p>
              </div>
              <div className=" hover:rotate-1 transition-all rounded-md gap-2 bg-opacity-10 bg-green-950 border font-normal flex flex-col items-center border-green-900 hover:border-green-800 p-6 col-span-12 md:col-span-4 ">
                <BsGraphDownArrow className="text-xl text-green-500" />
                <p className="text-balance  text-lg text-neutral-300"><span className="text-xl text-white font-bold">50%</span> <br />
                  reduction in interview preparation time for hiring managers.</p>
              </div>
            </div>
          </div>

          <div className="mt-[100px] space-y-8 sm:space-y-16">
            <h2 className={"text-2xl sm:text-3xl md:text-4xl text-start text-neutral-200 " + fraunces.className}>
              <span className="text-green-500">Generate</span> Questions <br />
              and <span className="text-green-500">Ace Your Interviews  </span>

            </h2>


            <div className={"flex  flex-col gap-8 " + quicksand.className}>
              <div className=" space-y-2 max-w-4xl group text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl text-neutral-200 flex gap-2 items-center"> <BiCustomize className="text-orange-400 group-hover:translate-x-1 transition-transform" /> Customize your interview questions</h3>
                <p className=" sm:text-lg text-neutral-400 font-normal">
                  Customize your interview questions based on parameters like  <span className=" underline underline-offset-2 decoration-dotted decoration-neutral-500">role, level, type, tone, description</span>. Tailor your preparation to match your specific needs.
                </p>
                <div className="w-full  py-4  overflow-hidden">
                  <Image
                    src="/ss-2.webp"
                    alt="Screenshot"
                    width={1920}
                    height={1080}
                    layout="responsive"
                    className="w-full shadow-lg h-auto rounded-lg border border-neutral-600"
                  />
                </div>

              </div>
              <div className=" space-y-2 max-w-4xl text-left group">
                <h3 className="text-lg sm:text-xl md:text-2xl text-neutral-200 flex gap-2 items-center"> <HiOutlineSaveAs className="text-blue-400 group-hover:translate-x-1 transition-transform" /> Save Your Generated Questions</h3>
                <p className=" sm:text-lg text-neutral-400 font-normal">
                  Easily save the questions you generate in your account. Keep all your customized <span className=" underline underline-offset-2 decoration-dotted decoration-neutral-500">interview questions organized and accessible</span> whenever you need them.
                </p>
                <div className="w-full  py-4  overflow-hidden">
                  <Image
                    src="/ss-3.webp"
                    alt="Screenshot"
                    width={1920}
                    height={1080}
                    layout="responsive"
                    className="w-full shadow-lg h-auto rounded-lg border border-neutral-600"
                  />
                </div>
              </div>
              <div className=" space-y-2 max-w-4xl text-left group">
                <h3 className="text-lg sm:text-xl md:text-2xl text-neutral-200 flex gap-2 items-center"> <BiSolidEdit className="text-purple-400 group-hover:translate-x-1 transition-transform" /> Manage Your Previous Questions</h3>
                <p className=" sm:text-lg text-neutral-400 font-normal">
                  <span className=" underline underline-offset-2 decoration-dotted decoration-neutral-500">Access and manage all your previously generated questions.</span> Edit, or review them to ensure your interview preparation stays relevant and up-to-date.
                </p>
                <div className="w-full  py-4  overflow-hidden">
                  <Image
                    src="/ss-4.webp"
                    alt="Screenshot"
                    width={1920}
                    height={1080}
                    layout="responsive"
                    className="w-full shadow-lg h-auto rounded-lg border border-neutral-600"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

        <div className="w-full p-5 rounded-2xl border border-neutral-800 h-[400px] my-[100px] bg-opacity-35 bg-[linear-gradient(to_right,#052e1650_1px,transparent_1px),linear-gradient(to_bottom,#052e1650_1px,transparent_1px)] bg-[size:24px_24px] flex justify-center items-center">
           <div className="flex flex-col items-center gap-6">
           <AnimatedSparkle animate={true} size={40} color='white' />
           <p className={"text-2xl  font-light text-center text-neutral-200 " + fraunces.className}>Effortlessly Create Role-Specific Interview Questions with AI Assistance</p>
           <Link href={"/home"} className="relative w-fit inline-flex h-12 overflow-hidden rounded-full p-[1px] active:scale-90 transition-all">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#22c55d_50%,#22c55d_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white-950 px-3 py-1 text-sm font-medium bg-gradient-to-r from-green-950 to-green-950 text-white backdrop-blur-3xl">
                Generate Questions
              </span>
            </Link>
           </div>
        </div>
        
        <div className="bg-gradient-to-l my-20 sm:[150px] from-transparent via-neutral-300 to-transparent w-full h-[1px] " />
        <footer className="  ">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 px-2.5 sm:text-2xl text-neutral-300">
              <MdOutlineStreetview className='text-xl sm:text-3xl text-green-500' /> InterviewGenie
            </div>
            <div className="flex text-neutral-300 gap-2 sm:gap-4 px-2.5 text-xl sm:text-3xl items-center">
              <Link href={"https://github.com/abhinav7895/interviewgenie"}><FaGithub /></Link> <Link href={"https://x.com/abhinavvay"}><FaXTwitter /></Link>
            </div>
          </div>
          <div className="pb-[40px] mt-2 px-3 flex items-center gap-3 ">
            <Link className="text-neutral-500 text-[13px] hover:text-neutral-400 transition-all" href={"https://www.interviewgenie.live/privacy"}>Privacy Policy</Link>
            <Link className="text-neutral-500 text-[13px] hover:text-neutral-400 transition-all" href={"https://www.interviewgenie.live/tos"}>Terms of Service</Link>
          </div>
        </footer>
      </MaxWidthWrapper>
      </div>
    </>
  );
}
