import {  FaBolt, FaFilePdf, FaSave, FaBookmark, FaShareAlt } from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";


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

