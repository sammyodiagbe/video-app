"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/utils/supabase/client";
import { FormEventHandler, useState } from "react";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUserAccount: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      const createAccount = await supabase.auth.signUp({
        email,
        password,
      });

      console.log(createAccount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={createUserAccount}>
        <div>
          <Input
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <Input
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <Button>Create your account</Button>
        </div>
      </form>
    </>
  );
};

export default SignupPage;
