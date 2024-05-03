"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEventHandler, useState } from "react";
import { supabase } from "@/utils/supabase/client";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(process.env.SUPABASE_URL);
  const logUserIn: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      const signin = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log(signin);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={logUserIn}>
        <div>
          <Input
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>
        <div>
          <Input
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <div className="">
          <Button>Login</Button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
