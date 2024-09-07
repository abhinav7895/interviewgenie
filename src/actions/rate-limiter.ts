import prisma from "@/lib/prisma";
import { addHours, isAfter } from "date-fns";

const RATE_LIMIT = 40;

export const checkRateLimit = async (userId: string) => {
    try {
      const rateLimit = await prisma.rateLimit.findUnique({
        where: { userId },
      });
  
      const now = new Date();
  
      if (!rateLimit) {
        await prisma.rateLimit.create({
          data: {
            userId,
            generatedCount: 1,
            resetAt: addHours(now, 1),
          },
        });
        return { allowed: true, resetAt: addHours(now, 1) };
      }
  
      if (isAfter(rateLimit.resetAt, now)) {
        if (rateLimit.generatedCount >= RATE_LIMIT) {
          return { allowed: false, resetAt: rateLimit.resetAt };
        } else {
          await prisma.rateLimit.update({
            where: { userId },
            data: { generatedCount: { increment: 1 } },
          });
          return { allowed: true, resetAt: rateLimit.resetAt };
        }
      } else {
        await prisma.rateLimit.update({
          where: { userId },
          data: {
            generatedCount: 1,
            resetAt: addHours(now, 1),
          },
        });
        return { allowed: true, resetAt: addHours(now, 1) };
      }
    } catch (error) {
      console.error('Error checking rate limit:', error);
      throw error;
    }
  };