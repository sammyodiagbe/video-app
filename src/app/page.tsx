import {
  SignInButton,
  UserButton,
  SignedIn,
  SignOutButton,
  SignedOut,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <SignedIn>
        <h1>You are currently authenticated</h1>
        <SignOutButton />
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
}
