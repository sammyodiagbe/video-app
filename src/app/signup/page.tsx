"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VerificationComponent from "@/components/verificationUI";
import { SignInButton, useSignUp } from "@clerk/nextjs";
import { FormEventHandler, useState } from "react";

const SignupPage = () => {
  const { signUp, isLoaded, setActive } = useSignUp();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);

  const createUserAccount: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    console.log(password);
    if (!isLoaded || !signUp) {
      return;
    }

    try {
      const signup = await signUp.create({
        emailAddress: email,
        password: "ImagineDragons1@",
      });

      console.log(signup);

      const sendVerificationEmail =
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
      setPendingVerification(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" min-h-screen grid items-center justify-center">
      <div className="w-[400px]">
        <SignInButton mode="modal" />
        {!pendingVerification ? (
          <>
            <h1 className="text-2xl mb-8">Create your account</h1>
            <form onSubmit={createUserAccount} className="grid gap-[20px]">
              <div>
                <Input
                  value={firstname}
                  type="text"
                  placeholder="Firstname"
                  onChange={(event) => setFirstname(event.target.value)}
                />
              </div>
              <div>
                <Input
                  value={lastname}
                  type="text"
                  placeholder="Lastname"
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
              <div>
                <Input
                  value={username}
                  type="text"
                  placeholder="Username"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div>
                <Input
                  value={email}
                  type="email"
                  placeholder="Your email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div>
                <Button>Create your account</Button>
              </div>
            </form>{" "}
          </>
        ) : (
          <VerificationComponent email={email} />
        )}
      </div>
    </div>
  );
};

export default SignupPage;
