import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { name } = await request.json();

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: "Invalid name provided" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { name: name },
    });

    return NextResponse.json(
      {
        message: "Name updated successfully",
        success: true,
        user: { name: updatedUser.name },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user name:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the name" },
      { status: 500 }
    );
  }
}