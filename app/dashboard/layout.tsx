"use client";
import { persistor, store } from "@/store";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
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
      </PersistGate>
    </Provider>
  );
}
