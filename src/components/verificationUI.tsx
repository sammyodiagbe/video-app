"use client";
import { FormEventHandler, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
type ComponentType = {
  email: string;
};

const VerificationComponent: React.FC<ComponentType> = ({ email }) => {
  const [code, setCode] = useState("");
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigator = useRouter();

  const validateEmailAddress: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    if (!isLoaded || code.trim() === "") return;
    try {
      const activate = await signUp?.attemptEmailAddressVerification({ code });
      if (activate.status === "complete") {
        await setActive({ session: activate.createdSessionId });
        navigator.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Verify your email Address ({email})</h1>
      <form onSubmit={validateEmailAddress}>
        <div className="">
          <Input
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
        </div>
        <div>
          <Button>Verify Email Address</Button>
        </div>
      </form>
    </div>
  );
};

export default VerificationComponent;
