import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center h-screen justify-center p-2 bg-background ">
      {/* <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-background flex flex-col items-center w-96 rounded-2xl py-10 px-8 shadow-lg border space-y-6"
        >
          <p className="font-semibold text-xl">Sign in to Chargrill</p>
          <p className="text-xs text-muted-foreground">
            Welcome back! Please sign in to continue
          </p>
          <div className="flex flex-col gap-2 w-full justify-center">
            <Clerk.Connection
              name="google"
              className="flex items-center gap-x-3 bg-background justify-center font-sans border shadow-sm py-1.5 px-2.5 rounded-md"
            >
              <Clerk.Icon className="size-4" />
              Google
            </Clerk.Connection>
            <Clerk.Connection
              name="facebook"
              className="flex items-center gap-x-3 justify-center bg-background font-sans border shadow-sm py-1.5 px-2.5 rounded-md"
            >
              <Clerk.Icon className="size-4" />
              Facebook
            </Clerk.Connection>
            <Clerk.Connection
              name="apple"
              className="flex items-center  gap-x-3 justify-center bg-background font-sans border shadow-sm py-1.5 px-2.5 rounded-md"
            >
              <Clerk.Icon className="size-4 " />
              Apple
            </Clerk.Connection>
          </div>

          <Clerk.Field name="identifier" className="space-y-2 w-full">
            <Clerk.Label className="text-sm font-medium">Email</Clerk.Label>
            <Clerk.Input className="w-full border rounded-md py-1.5 px-2.5 bg-input" />
            <Clerk.FieldError className="block text-red-500 text-sm" />
          </Clerk.Field>

          <SignIn.Action
            submit
            className="bg-primary text-primary-foreground rounded-md py-1.5 px-2.5 w-full"
          >
            Continue
          </SignIn.Action>
          <p>Don't have an account?</p>
          <Link href={"/sign-up"} className="text-primary">
            Sign-up
          </Link>
        </SignIn.Step>
        <SignIn.Step
          name="verifications"
          className="bg-background flex flex-col items-center  rounded-2xl py-10 px-8 shadow-lg border space-y-6"
        >
          <p className="font-semibold text-xl">Enter your password</p>
          <p className="text-xs text-muted-foreground">
            Enter the password associated with your account.
          </p>
          <SignIn.Strategy name="password">
            <Clerk.Field name="password">
              <Clerk.Label className="text-sm font-medium">
                Password
              </Clerk.Label>
              <SignIn.Step
                name="choose-strategy"
                className="bg-background flex flex-col items-center  rounded-2xl py-10 px-8 shadow-lg border space-y-6"
              >
            F
              </SignIn.Step>
              <Clerk.Input className="w-full border rounded-md py-1.5 px-2.5 bg-input shadow-2xs" />
              <Clerk.FieldError />
            </Clerk.Field>
            <SignIn.Action
              submit
              className="bg-primary w-full rounded-md p-1 text-primary-foreground hover:bg-primary/80 hover:cursor-pointer"
            >
              Continue
            </SignIn.Action>
          </SignIn.Strategy>
        </SignIn.Step>
      </SignIn.Root> */}
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary",
            cardBox: {
              backgroundColor: "black",
            },
          },
        }}
      />
    </div>
  );
}
