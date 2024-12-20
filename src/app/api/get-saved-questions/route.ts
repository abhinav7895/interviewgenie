// app/api/questions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get('limit');

  try {
    const queryOptions: {
      where: { userId: string };
      select: { id: true; content: true; createdAt: true, shareHash : true };
      orderBy: { createdAt: 'desc' };
      take?: number;
    } = {
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        shareHash : true
      },
      orderBy: {
        createdAt: 'desc',
      },
    };

    if (limit && !isNaN(Number(limit))) {
      queryOptions.take = Number(limit);
    }

    const savedQuestions = await prisma.question.findMany(queryOptions);

    return NextResponse.json({ success: true, savedQuestions }, { status: 200 });
  } catch (error) {
    console.error('Error fetching saved questions:', error);
    return NextResponse.json({ error: 'Failed to fetch saved questions' }, { status: 500 });
  }
}
