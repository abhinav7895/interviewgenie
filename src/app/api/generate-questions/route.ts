import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { checkRateLimit } from "@/actions/rate-limiter";
import { InterviewResponse } from "@/types/types";
import { generateBatch } from "@/lib/question-generator";
import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject, streamObject, streamText } from "ai";
import generatePrompt from "@/lib/prompt-generator";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const InterviewResponseSchema = z.object({
  topic: z.string(),
  questionsAndAnswers: z.array(
    z.object({
      id: z.string(),
      ques: z.string(),
      ans: z.string(),
    })
  ),
});

export const POST = async (req: NextRequest) => {
  try {
    const { role, level, questionType, tone, jobDescription } = await req.json();
    const model = openai("gpt-4o", {
      structuredOutputs: true,
    });
    const prompt = generatePrompt(role, level, questionType, tone, jobDescription);
    const response = await streamObject({
      model,
      messages: [
        {
            role: 'system',
            content: `You are assisting with generating interview questions for ${role} role`
          },
        {
            role: 'user',
            content: prompt
        }
    ],
      schema: z.object({
        topic: z.string(),
        questionsAndAnswers: z.array(
          z.object({
            id: z.string(),
            ques: z.string(),
            ans: z.string(),
          })
        ),
      }),
    });

    return response.toTextStreamResponse(); 
  } catch (error) {
    console.error("Error generating answer:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to generate answer",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
};
