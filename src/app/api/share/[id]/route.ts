import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/auth";
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { error: "Question Id is required" },
      { status: 404 }
    );
  }

  try {
    const question = await prisma.question.findUnique({
      where: { id },
    });

    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    if (question.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    let updatedQuestion;

    if (question.shareHash) {
      updatedQuestion = question;
    } else {
      const shareHash = uuidv4();
      updatedQuestion = await prisma.question.update({
        where: { id },
        data: { shareHash },
      });
    }

    return NextResponse.json(
      { shareHash: updatedQuestion.shareHash, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating share hash:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
