import { SignIn, SignInButton } from "@clerk/nextjs";

export default async function Page() {
  return (
    <div className="flex items-center h-screen justify-center ">
      <SignInButton withSignUp mode="redirect">
        <SignIn />
      </SignInButton>
    </div>
  );
}
