"use server";

import { signOut } from "@/auth";

export const handleLogOut = async () => {
  await signOut();
};
