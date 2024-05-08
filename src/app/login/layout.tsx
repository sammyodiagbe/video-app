import { useAuth } from "@clerk/nextjs";
import { Metadata } from "next";
import { NextResponse } from "next/server";

export const metadata: Metadata = {
  title: "login into your account",
};
const LoginRootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await useAuth();
  if (user.sessionId) {
    NextResponse.redirect("/home");
  }
  return <>{children}</>;
};

export default LoginRootLayout;
