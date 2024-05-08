import { SignOutButton } from "@clerk/nextjs";

const HomePage = async () => {
  return (
    <>
      <h1>Page should only be accessed by authenticated users,</h1>
      <SignOutButton redirectUrl="/login" />
    </>
  );
};

export default HomePage;
