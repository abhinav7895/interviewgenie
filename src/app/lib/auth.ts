import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(
  process.env.ACCESS_TOKEN_SECRET
);

const REFRESH_TOKEN_SECRET = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET
);

interface TokenPayload extends JWTPayload {
  userId: string;
}

const generateAccessToken = (userId: string) => {
  return new SignJWT({ userId })
    .setExpirationTime(process.env.ACCESS_TOKEN_SECRET_EXPIRY!)
    .setProtectedHeader({ alg: "HS256" })
    .sign(ACCESS_TOKEN_SECRET);
};

const generateRefreshToken = async (userId: string) => {
  return new SignJWT({ userId })
    .setExpirationTime(process.env.REFRESH_TOKEN_SECRET_EXPIRY!)
    .setProtectedHeader({ alg: "HS256" })
    .sign(REFRESH_TOKEN_SECRET);
};

const verifyAccessToken = async (
  token: string
): Promise<TokenPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, ACCESS_TOKEN_SECRET);
    return payload as TokenPayload;
  } catch (error) {
    return null;
  }
};

const verifyRefreshToken = async (
  token: string
): Promise<TokenPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, REFRESH_TOKEN_SECRET);
    return payload as TokenPayload;
  } catch (error) {
    return null;
  }
};

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

const setTokenCookie = (name: string, value: string, expires: number) => {
  cookies().set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires,
    path: "/",
  });
};

const getTokenCookie = (name: string) => {
  return cookies().get(name);
};

const removeTokenCookie = (name: string) => {
  return cookies().delete(name);
};

const getUserFromToken = async (
  req: NextRequest
): Promise<{ id: string } | null> => {
  const token = req.cookies.get("accessToken")?.value;

  if (!token) return null;

  const payload = await verifyAccessToken(token);
  if (!payload) return null;

  return { id: payload.userId };
};

function generateVerificationCode(length: number = 6): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let verifyCode = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    verifyCode += characters[randomIndex];
  }
  return verifyCode;
}

function generatePasswordResetCode(length: number = 6): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let resetCode = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    resetCode += characters[randomIndex];
  }
  return resetCode;
}
