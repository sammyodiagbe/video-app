import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const metadata: Metadata = {
  title: "login into your account",
};
const LoginRootLayout = (
  { children }: { children: React.ReactNode },
  request: NextRequest
) => {
  const { userId } = auth();
  if (userId) {
    redirect("/home");
  }
  return <>{children}</>;
};

export default LoginRootLayout;
