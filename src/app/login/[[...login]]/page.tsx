"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEventHandler, useState } from "react";
import { login } from "../action";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const navigate = useRouter();
  const { signIn, isLoaded, setActive } = useSignIn();
  const [authenticated, setAuthenticated] = useState(false);

  const logUserIn: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!isLoaded || !signIn) return;
    try {
      const login = await signIn.create({
        identifier: email,
        password,
      });

      if (login.status === "complete") {
        await setActive({ session: login.createdSessionId });
        router.push("/home");
      }
    } catch (error: any) {
      toast({
        description: error.errors[0].message,
      });
    }

    // const login = await
  };

  if (authenticated) {
    return navigate.push("/home");
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>
        <div className="w-[400px]">
          {authenticated ? <p>Authenticated</p> : null}
          <h1 className="text-2xl font-bold mb-5">Log into your account</h1>
          <form onSubmit={logUserIn} className="grid gap-[20px]">
            <div>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                name="email"
              />
            </div>
            <div>
              <Input
                type="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                name="password"
                id="password"
              />
            </div>
            <div className="">
              <Button formAction={login}>Login</Button>
            </div>
          </form>
        </div>
        <Link href={"/signup"} className="mt-8 text-center">
          Don't have an account, signup.
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
