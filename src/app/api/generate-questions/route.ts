import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { checkRateLimit } from "@/actions/rate-limiter";
import { InterviewResponse } from "@/types/types";
import { generateBatch } from "@/lib/question-generator";

export const POST = async (req: NextRequest) => {
  try {
    const { role, level, questionType, tone, jobDescription } = await req.json();
    const session = await auth();

    if (!session?.user) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const rateLimitResult = await checkRateLimit(user.id);

    if (!rateLimitResult.allowed) {
      return Response.json({
        message: `You have exceeded the request limit. Please try again.`,
        success: false,
      }, { status: 429 });
    }

    const [batch1, batch2, batch3, batch4] = await Promise.all([
      generateBatch(role, level, questionType, tone, jobDescription, 1),
      generateBatch(role, level, questionType, tone, jobDescription, 1),
      generateBatch(role, level, questionType, tone, jobDescription, 2),
      generateBatch(role, level, questionType, tone, jobDescription, 2)
    ]);

    const allQuestions = [
      ...batch1.questionsAndAnswers,
      ...batch2.questionsAndAnswers,
      ...batch3.questionsAndAnswers,
      ...batch4.questionsAndAnswers
    ];

    const finalResponse: InterviewResponse = {
      topic: batch1.topic,
      questionsAndAnswers: allQuestions,
    };

    return Response.json(
      { success: true, message: finalResponse },
      { status: 200 }
    );
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