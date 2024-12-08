import { InterviewResponse } from "@/types/types";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generatePrompt = (
  role: string,
  level?: string,
  questionType?: string,
  tone?: string,
  jobDescription?: string
) => {
  return `Generate 10 interview questions with their answers for a ${role}${
    level ? ` at ${level} level` : ""
  }.
${tone ? `The tone should be ${tone}.` : ""}
${jobDescription ? `Context: "${jobDescription}"` : ""}
${questionType ? `Type of the question : ${questionType}` : ""}
Respond with a JSON object, for example:
{
  "topic": "Technical JavaScript Questions",
  "questionsAndAnswers": [
    {"id": "q1", "ques": "What are the callback functions in JavaScript", "ans": "A callback function in JavaScript is a ..."},
  ]
}
Ensure:
1. Short, clear answers
2. No formatting or extra characters
3. Question and Answer will too short and clear
`;
};

export const generateBatch = async (
  role: string,
  level?: string,
  questionType?: string,
  tone?: string,
  jobDescription?: string,
  batchNumber?: number
): Promise<InterviewResponse> => {
  const prompt = generatePrompt(
    role,
    level,
    questionType,
    tone,
    jobDescription,
    batchNumber!
  );

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
    max_tokens: 1024,
  });

  const response = completion.choices[0].message.content;

  if (!response) {
    throw new Error(`No response}`);
  }

  let parsedResponse: InterviewResponse;
  try {
    parsedResponse = JSON.parse(response);
  } catch (error) {
    console.error(`JSON parsing error in batch ${batchNumber}:`, error);
    console.error("Raw response:", response);
    throw new Error(`Invalid JSON response from AI in batch ${batchNumber}`);
  }

  if (
    !parsedResponse.topic ||
    !Array.isArray(parsedResponse.questionsAndAnswers) ||
    parsedResponse.questionsAndAnswers.length !== 3
  ) {
    console.error(
      `Invalid response structure in batch ${batchNumber}:`,
      parsedResponse
    );
    throw new Error(
      `Invalid response structure from AI in batch ${batchNumber}`
    );
  }

  return parsedResponse;
};
