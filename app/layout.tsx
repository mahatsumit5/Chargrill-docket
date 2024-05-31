import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Toaster from "@/components/Toaster";

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
  return (
    <ClerkProvider
      signInUrl="/"
      afterSignOutUrl={"/"}
      signUpUrl="/sign-up"
      signInForceRedirectUrl={"/home"}
    >
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
