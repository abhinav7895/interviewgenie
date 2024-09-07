import { AiOutlineSafety } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { FaDatabase, FaServer, FaMobileAlt, FaUserCog, FaBolt, FaChartLine, FaFilePdf, FaRobot, FaSave, FaBookmark, FaShareAlt } from "react-icons/fa";
import { IoIosCloud } from "react-icons/io";
import { MdDevices } from "react-icons/md";
import { RiAiGenerate } from "react-icons/ri";

const jobRoles = [
  {
    title: "Frontend Developer",
    icon: CgWebsite,
    iconColor: "text-red-500",
    level: "Junior",
    type: "Technical",
    tone: "Professional",
    description: "Looking for a frontend developer with a solid understanding of React, Tailwind, and JavaScript to join our dynamic team.",
    salary: 70000,
    location: "Remote"
  },
  {
    title: "Cloud Engineer",
    icon: IoIosCloud,
    iconColor: "text-blue-500",
    level: "Junior",
    type: "Mixed",
    tone: "Challenging",
    description: "Looking for a junior cloud engineer proficient in AWS and Azure to assist in deploying and managing scalable cloud infrastructure solutions.",
    salary: 80000,
    location: "New York"
  },
  {
    title: "Data Scientist",
    icon: FaDatabase,
    iconColor: "text-purple-500",
    level: "Senior",
    type: "Technical",
    tone: "Professional",
    description: "Seeking a senior data scientist with expertise in machine learning, statistical analysis, and Python to lead our data-driven projects.",
    salary: 120000,
    location: "San Francisco"
  },
  {
    title: "Backend Developer",
    icon: FaServer,
    iconColor: "text-green-500",
    level: "Mid",
    type: "Technical",
    tone: "Friendly",
    description: "Join our backend team to build robust and scalable server-side applications using Node.js and PostgreSQL.",
    salary: 90000,
    location: "Austin"
  },
  {
    title: "Mobile App Developer",
    icon: FaMobileAlt,
    iconColor: "text-yellow-500",
    level: "Senior",
    type: "Technical",
    tone: "Casual",
    description: "Experienced mobile developer needed to create cutting-edge iOS and Android applications using React Native.",
    salary: 110000,
    location: "Seattle"
  },
  {
    title: "DevOps Engineer",
    icon: MdDevices,
    iconColor: "text-indigo-500",
    level: "Mid",
    type: "Mixed",
    tone: "Professional",
    description: "Seeking a DevOps engineer to streamline our CI/CD pipelines and improve infrastructure automation.",
    salary: 100000,
    location: "Chicago"
  },
  {
    title: "Cybersecurity Analyst",
    icon: AiOutlineSafety,
    iconColor: "text-orange-500",
    level: "Junior",
    type: "Technical",
    tone: "Challenging",
    description: "Join our security team to protect our systems from cyber threats and implement best practices in information security.",
    salary: 75000,
    location: "Washington D.C."
  }
];
export const features = [
  {
    title: "Generate Questions",
    icon: <RiAiGenerate className="text-yellow-400 dark:text-yellow-500" />
  },
  {
    title: "Instant Answers",
    icon: <FaBolt className="text-red-400 dark:text-red-500" />
  },
  {
    title: "Export PDF",
    icon: <FaFilePdf className="text-blue-400 dark:text-blue-500" />
  },
  {
    title: "Question Bank",
    icon: <FaSave className="text-green-400 dark:text-green-500" />
  },
  {
    title: "Save Questions",
    icon: <FaBookmark className="text-purple-400 dark:text-purple-500" />
  },
  {
    title: "Share Questions",
    icon: <FaShareAlt className="text-orange-400 dark:text-orange-500" />
  },
];

export function timeSince(timestamp: string): string {
  const now: Date = new Date();
  const pastDate: Date = new Date(timestamp);
  const secondsAgo: number = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
  };

  for (const key in intervals) {
      const interval: number = Math.floor(secondsAgo / intervals[key]);
      if (interval >= 1) {
          return `Last question ${interval} ${key}${interval > 1 ? 's' : ''} ago`;
      }
  }

  return 'Just now';
}