import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  

    const id = params.id;
    const question = await prisma.question.findUnique({
      where: { id },
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
      { message: "Success", data: transformedResponse },
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
