import { IconType } from "react-icons/lib";

export interface JobRoles {
  title: string;
  icon: IconType;
  iconColor: string;
  level: string;
  type: string;
  tone: string;
  description: string;
  salary: number;
  location: string;
}

export interface FormData {
  role: string;
  level?: string;
  questionType?: string;
  tone?: string;
  jobDescription?: string;
}


export interface QuestionAnswer {
  id: string;
  ques: string;
  ans: string;
}

export interface InterviewResponse {
  id ?: string,
  topic: string;
  questionsAndAnswers: QuestionAnswer[];
}


export interface SavedQuestion {
  id: string;
  content: string;
  createdAt: string;
}
