import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { questionsAndAnswers, queryInfo, topic } = await request.json();
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const shareHash = uuidv4();
    const question = await prisma.question.create({
      data: {
        userId: user.id,
        role: queryInfo.role,
        includeAnswer: queryInfo.includeAnswer,
        ...(queryInfo.level && { level: queryInfo.level }),
        ...(queryInfo.questionType && { questionType: queryInfo.questionType }),
        ...(queryInfo.tone && { tone: queryInfo.tone }),
        ...(queryInfo.jobDescription && {
          jobDescription: queryInfo.jobDescription,
        }),
        shareHash,
        content: topic,
        answers: {
          create: questionsAndAnswers.map((qa: any) => ({
            content: JSON.stringify({
              question: qa.ques,
              ...(queryInfo.includeAnswer === "true" && { answer: qa.ans }),
            }),
          })),
        },
      },
      include: {
        answers: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Successfully saved",
        data: {
          id: question.id,
          content: question.content,
          createdAt: question.createdAt,
          shareHash
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving question:", error);
    return NextResponse.json(
      { error: "Failed to save question" },
      { status: 500 }
    );
  }
}
