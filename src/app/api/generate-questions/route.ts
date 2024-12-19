import { NextRequest } from "next/server";
import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import {  streamObject, } from "ai";
import { generatePrompt } from "@/lib/prompt-generator";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: NextRequest) => {
  try {
    const { role, level, questionType, tone, jobDescription, includeAnswer } =
      await req.json();
    const model = openai("gpt-4o", {
      structuredOutputs: true,
    });
    const prompt = generatePrompt(
      role,
      level,
      questionType,
      tone,
      jobDescription,
      includeAnswer
    );
    const response = await streamObject({
      model,
      messages: [
        {
          role: "system",
          content: `You are assisting with generating interview questions for ${role} role`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      schema: z.object({
        topic: z.string(),
        questionsAndAnswers: z.array(
          z.object({
            id: z.string(),
            ques: z.string(),
            ...(includeAnswer === "true" && { ans: z.string() }),
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
