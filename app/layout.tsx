import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
const inter = Montserrat({ subsets: ["latin"], weight: ["400"] });

import { cookies } from "next/headers";
import { createNewOrder } from "@/database/actions/order.action";
export const metadata: Metadata = {
  title: "Create Docket",
  description: "Create docket for CharGrill",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cookieStore = await cookies();
  // const theme = cookieStore.get("theme");
  // console.log("this is the theme", theme?.value);
  return (
    <ClerkProvider
      appearance={{
        cssLayerName: "clerk",
      }}
    >
      <html lang="en">
        <body className={`${inter.className}`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
