import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "InterviewGenie | AI-Powered Interview Question Generator",
  description: "Prepare for your next job interview with InterviewGenie. Generate tailored interview questions and answers for any role, level, and industry.",
  keywords: "interview preparation, job interview, interview questions, AI interview tool, career development",
  openGraph: {
    title: "InterviewGenie | Ace Your Next Interview",
    description: "Get ready for your job interview with AI-generated questions and answers tailored to your specific role and industry.",
    type: "website",
    url: "https://www.interviewgenie.live", 
    images: [
      {
        url: "https://res.cloudinary.com/dt6kdmcjb/image/upload/v1725730067/yzloc5tsprdtzvklspeg.pngg", 
        width: 1200,
        height: 630,
        alt: "InterviewGenie - AI-Powered Interview Preparation",
      },
    ],
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#4ade80", 
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body className={inter.className + " bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100  min-h-screen"}>
        <ThemeProvider attribute="class" defaultTheme="dark" >
          <Toaster richColors position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
