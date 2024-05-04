"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VerificationComponent from "@/components/verificationUI";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";

const SignupPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const createUserAccount = async (formData: FormData) => {
    if (!isLoaded) {
      return;
    }

    try {
      const signup = await signUp.create({
        emailAddress: email,
        username,
        password,
        firstName: firstname,
        lastName: lastname,
      });

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
    <>
      {!pendingVerification ? (
        <>
          <h1 className="text-xl">Create your account</h1>
          <form action={createUserAccount}>
            <div>
              <Input
                value={firstname}
                placeholder="Email"
                onChange={(event) => setFirstname(event.target.value)}
              />
            </div>
            <div>
              <Input
                value={lastname}
                placeholder="Lastname"
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div>
              <Input
                value={username}
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div>
              <Input
                value={email}
                placeholder="Your email"
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
          </form>{" "}
        </>
      ) : (
        <VerificationComponent email={email} />
      )}
    </>
  );
};

export default SignupPage;
