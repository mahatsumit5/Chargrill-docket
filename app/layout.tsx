import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import StoreProvider from "../redux/StoreProvider";
import { createUser } from "@/database/actions/user.action";
import { createLocation } from "@/database/actions/location.action";

const inter = Montserrat({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Create Docket",
  description: "Create docket for CharGrill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // createUser();

  return (
    <ClerkProvider
      signInUrl="/"
      afterSignOutUrl={"/"}
      signUpUrl="/sign-up"
      signInForceRedirectUrl={"/home"}
    >
      <html lang="en">
        <body className={inter.className}>
          <StoreProvider>{children}</StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
