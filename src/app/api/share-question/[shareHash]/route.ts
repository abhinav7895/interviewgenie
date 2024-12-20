import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { shareHash: string } }
) {
  try {
    const shareHash = params.shareHash;
    const question = await prisma.question.findUnique({
      where: { shareHash },
      include: { answers: true },
    });

    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    const transformedResponse = {
      topic: question.content,
      id : question.id,
      includeAnswer : question.includeAnswer, 
      questionsAndAnswers: question.answers.map((answer) => {
        const parsedAns = JSON.parse(answer.content);
        return {
          id: answer.id,
          ques: parsedAns.question,
          ans: parsedAns.answer,
        };
      }),
    };

    return NextResponse.json(
      { message: "Success", data: transformedResponse, success : true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
