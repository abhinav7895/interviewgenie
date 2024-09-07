import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function DELETE(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.answer.deleteMany({
      where: {
        question: {
          userId: user.id,
        },
      },
    });

    await prisma.question.deleteMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        message: `Deleted Successfully`,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user questions and answers:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting questions and answers" },
      { status: 500 }
    );
  }
}
