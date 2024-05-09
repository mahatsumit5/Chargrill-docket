import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex  w-full p-4 border-b shadow-md">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </header>
      <main className="flex h-full justify-center items-center">
        {children}
      </main>
    </div>
  );
}
