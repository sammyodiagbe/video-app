import {
  SignInButton,
  UserButton,
  SignedIn,
  SignOutButton,
  SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SignedIn>
        <h1>You are currently authenticated</h1>
        <SignOutButton />
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Link href={"/login"}>Login now</Link>
      </SignedOut>
    </>
  );
}
