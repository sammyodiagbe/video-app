import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { NextResponse } from "next/server";

export const metadata: Metadata = {
  title: "login into your account",
};
const LoginRootLayout = ({ children }: { children: React.ReactNode }) => {
  //   const { userId, sessionId } = auth();
  //   if (sessionId && userId) {
  //     NextResponse.redirect("/home");
  //   }
  return <>{children}</>;
};

export default LoginRootLayout;
