import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const session = await auth();
console.log(session);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { topic, questionsAndAnswers, role, level, questionType, tone , jobDescription } = await request.json();

     const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const question = await prisma.question.create({
      data: {
        userId: user.id,
        role: role,
        ...(level && { level }),
        ...(questionType && { questionType }),
        ...(tone && { tone }),
        ...(jobDescription && { jobDescription }),
        content: topic,
        answers: {
          create: questionsAndAnswers.map((qa: any) => ({
            content: JSON.stringify({ question: qa.ques, answer: qa.ans }),
          })),
        },
      },
      include: {
        answers: true,
      },
    });

    return NextResponse.json({ success: true, message : "Successfully saved", data : {
      id : question.id,
      content : question.content,
      createdAt : question.createdAt
    }  }, {status : 201});
  } catch (error) {
    console.error('Error saving question:', error);
    return NextResponse.json({ error: 'Failed to save question' }, { status: 500 });
  } 
}