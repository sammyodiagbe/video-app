"use client";
import { FormEventHandler, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
type ComponentType = {
  email: string;
};

const VerificationComponent: React.FC<ComponentType> = ({ email }) => {
  const [code, setCode] = useState("");
  const { isLoaded, signUp, setActive } = useSignUp();
  const createUserData = useMutation(api.authmutation.createUserData);
  const navigator = useRouter();

  if (!isLoaded && !signUp) {
    return;
  }

  const validateEmailAddress: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    if (!isLoaded || code.trim() === "") return;
    try {
      const activate = await signUp?.attemptEmailAddressVerification({ code });

      if (activate.status === "complete") {
        await setActive({ session: activate.createdSessionId });
        const { id, firstName, lastName, username } = activate;
        await createUserData({
          userId: id!,
          firstname: firstName!,
          lastname: lastName!,
          username: username!,
        });
        navigator.push("/home");
      }
    } catch (error: any) {
      toast({
        description: error.errors[0].message,
      });
    }
  };
  return (
    <div>
      <h1>Verify your email Address ({email})</h1>
      <form onSubmit={validateEmailAddress}>
        <div className="mb-5">
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
