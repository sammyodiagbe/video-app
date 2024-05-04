"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { login } from "./action";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form>
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
    </>
  );
};

export default LoginPage;
