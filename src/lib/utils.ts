import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeSince(timestamp: string): string {
  const now: Date = new Date();
  const pastDate: Date = new Date(timestamp);
  const secondsAgo: number = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
  };

  for (const key in intervals) {
      const interval: number = Math.floor(secondsAgo / intervals[key]);
      if (interval >= 1) {
          return `Last question ${interval} ${key}${interval > 1 ? 's' : ''} ago`;
      }
  }

  return 'Just now';
}